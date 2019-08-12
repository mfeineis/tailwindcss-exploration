effect module Debounce where { command = MyCmd } exposing (debounce)

import Dict exposing (Dict)
import Process
import Task exposing (Task)
import Tuple



-- Public API


debounce : String -> Float -> (Result x a -> msg) -> Task x a -> Cmd msg
debounce key delay msg task =
    task
        |> Task.andThen (Task.succeed << msg << Ok)
        |> Task.onError (Task.succeed << msg << Err)
        |> (command << Debounce key delay)



-- Effect Manager


type alias State msg =
    Dict String ( Task msg msg, Process.Id )


type MyCmd msg
    = Debounce String Float (Task msg msg)


type SelfMsg
    = Execute String


init : Task Never (State msg)
init =
    Task.succeed Dict.empty


cmdMap : (a -> b) -> MyCmd a -> MyCmd b
cmdMap f (Debounce key delay task) =
    let
        mapTask =
            Task.map f >> Task.mapError f
    in
    Debounce key delay (mapTask task)


onEffects : Platform.Router msg SelfMsg -> List (MyCmd msg) -> State msg -> Task Never (State msg)
onEffects router cmds state =
    case cmds of
        [] ->
            Task.succeed state

        (Debounce key delay task) :: rest ->
            let
                updateState v =
                    Dict.insert key v state
            in
            runIgnoreAndThen
                (maybeKill (Maybe.map Tuple.second (Dict.get key state)))
                (Process.spawn (eventuallyExecute router key delay))
                |> Task.andThen
                    (onEffects router rest
                        << updateState
                        << Tuple.pair task
                    )


onSelfMsg : Platform.Router msg SelfMsg -> SelfMsg -> State msg -> Task Never (State msg)
onSelfMsg router selfMsg state =
    case selfMsg of
        Execute key ->
            runIgnoreAndThen
                (Process.spawn (maybeExecuteTask router (Maybe.map Tuple.first (Dict.get key state))))
                (Task.succeed (Dict.remove key state))



-- Utils


runIgnoreAndThen : Task a b -> Task a c -> Task a c
runIgnoreAndThen t1 t2 =
    Task.andThen (\_ -> t2) t1


eventuallyExecute : Platform.Router msg SelfMsg -> String -> Float -> Task x ()
eventuallyExecute router key delay =
    runIgnoreAndThen
        (Process.sleep delay)
        (Platform.sendToSelf router (Execute key))


maybeKill : Maybe Process.Id -> Task x ()
maybeKill pid =
    Maybe.map Process.kill pid
        |> Maybe.withDefault (Task.succeed ())


maybeExecuteTask : Platform.Router msg SelfMsg -> Maybe (Task msg msg) -> Task x ()
maybeExecuteTask router mTask =
    case mTask of
        Just task ->
            task
                |> Task.andThen (Platform.sendToApp router)
                |> Task.onError (Platform.sendToApp router)

        Nothing ->
            Task.succeed ()
