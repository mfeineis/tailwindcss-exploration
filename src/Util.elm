module Util exposing ((=>))

--import Elm.Kernel.Math
import Task exposing (Task)


infix left  0 (=>) = rocket


rocket : model -> List (Cmd msg) -> ( model, Cmd msg )
rocket model cmds =
    ( model, Cmd.batch cmds )


--floor : number -> number
--floor =
--    Elm.Kernel.Math.floor
