effect module SubEffectManager where { subscription = MySub } exposing (on)

import Task exposing (Task)



-- Public API


on : (Float -> msg) -> Sub msg
on toMsg =
    subscription (Start toMsg)



-- Effect Manager


type alias State msg =
    List (MySub msg)


type MySub msg
    = Start (Float -> msg)


type SelfMsg
    = Execute

init : Task Never (State msg)
init =
    Task.succeed []


subMap : (a -> b) -> MySub a -> MySub b
subMap func sub =
    case sub of
        Start toMsg ->
            Start (func << toMsg)



onEffects : Platform.Router msg SelfMsg -> List (MySub msg) -> State msg -> Task Never (State msg)
onEffects router subs state =
    case subs of
        [] ->
            Task.succeed state

        (Start toMsg) :: rest ->
            onEffects router rest state



onSelfMsg : Platform.Router msg SelfMsg -> SelfMsg -> State msg -> Task Never (State msg)
onSelfMsg router selfMsg state =
    case selfMsg of
        Execute ->
            Task.succeed []

