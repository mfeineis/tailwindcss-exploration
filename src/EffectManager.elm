effect module EffectManager where { command = MyCmd, subscription = MySub } exposing (on, start)

import Task exposing (Task)



-- Public API


on : (Float -> msg) -> Sub msg
on toMsg =
    subscription (MySub toMsg)


start : (Result x a -> msg) -> Task x a -> Cmd msg
start toMsg task =
    task
        |> Task.andThen (\it -> Task.succeed (toMsg (Ok it)))
        |> Task.onError (\err -> Task.succeed (toMsg (Err err)))
        |> (\it -> command (MyCmd it))



-- Effect Manager


type alias State =
    ()


type MyCmd msg
    = MyCmd (Task msg msg)


type MySub msg
    = MySub (Float -> msg)


type SelfMsg msg
    = Mutate
    | Notify (Float -> msg)


init : Task Never State
init =
    Task.succeed ()


cmdMap : (a -> b) -> MyCmd a -> MyCmd b
cmdMap f (MyCmd task) =
    let
        mapTask =
            Task.map f >> Task.mapError f
    in
    MyCmd (mapTask task)


subMap : (a -> b) -> MySub a -> MySub b
subMap func sub =
    case sub of
        MySub toMsg ->
            MySub (func << toMsg)


onEffects : Platform.Router msg (SelfMsg msg) -> List (MyCmd msg) -> List (MySub msg) -> State -> Task Never State
onEffects router cmds subs state =
    let
        subTasks =
            (case subs of
                [] ->
                    Task.succeed state

                (MySub toMsg) :: rest ->
                    Platform.sendToSelf router (Notify toMsg)
                        |> Task.andThen (\_ -> Task.succeed state)
            )

        cmdTasks =
             (case cmds of
                 [] ->
                     Task.succeed state

                 (MyCmd task) :: rest ->
                     Platform.sendToSelf router Mutate
                         |> Task.andThen (\_ -> Task.succeed state)
             )
    in
    Task.succeed state


onSelfMsg : Platform.Router msg (SelfMsg msg) -> SelfMsg msg -> State -> Task Never State
onSelfMsg router selfMsg state =
    case selfMsg of
        Mutate ->
            Task.succeed state

        Notify toMsg ->
            Platform.sendToApp router (toMsg 42)
                |> Task.andThen (\_ -> Task.succeed state)
