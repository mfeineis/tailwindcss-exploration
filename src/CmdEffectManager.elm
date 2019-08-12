effect module CmdEffectManager where { command = MyCmd } exposing (start)

import Task exposing (Task)



-- Public API


start : (Result x a -> msg) -> Task x a -> Cmd msg
start toMsg task =
    task
        |> Task.andThen (\it -> Task.succeed (toMsg (Ok it)))
        |> Task.onError (\err -> Task.succeed (toMsg (Err err)))
        |> (\it -> command (Start it))



-- Effect Manager


type alias State =
    ()


type MyCmd msg
    = Start (Task msg msg)


type SelfMsg
    = Execute


init : Task Never State
init =
    Task.succeed ()


cmdMap : (a -> b) -> MyCmd a -> MyCmd b
cmdMap f (Start task) =
    let
        mapTask =
            Task.map f >> Task.mapError f
    in
    Start (mapTask task)


onEffects : Platform.Router msg SelfMsg -> List (MyCmd msg) -> State -> Task Never State
onEffects router cmds state =
    case cmds of
        [] ->
            Task.succeed state

        (Start task) :: rest ->
            onEffects router rest state


onSelfMsg : Platform.Router msg SelfMsg -> SelfMsg -> State -> Task Never State
onSelfMsg router selfMsg state =
    case selfMsg of
        Execute ->
            Task.succeed ()



-- Utils
