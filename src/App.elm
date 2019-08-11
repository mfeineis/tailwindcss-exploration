module App exposing (main)

import Browser
import Html exposing (Html, div, img, p, span, text)
import Html.Attributes as Attr exposing (alt, attribute, class, src, title)
import Svg exposing (svg)
import Svg.Attributes exposing (d, viewBox)


view : {} -> Html msg
view _ =
    div []
        [ div [ class "max-w-sm rounded overflow-hidden shadow-lg" ]
            [ img [ alt "Sunset in the mountains", class "w-full", src "/assets/card-top.jpg" ]
                []
            , div [ class "px-6 py-4" ]
                [ div [ class "font-bold text-xl mb-2" ]
                    [ text "The Coldest Sunset" ]
                , p [ class "text-gray-700 text-base" ]
                    [ text "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.    " ]
                ]
            , div [ class "px-6 py-4" ]
                [ span [ class "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" ]
                    [ text "#photography" ]
                , span [ class "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" ]
                    [ text "#travel" ]
                , span [ class "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700" ]
                    [ text "#winter" ]
                ]
            ]
            , div
            [ class "max-w-sm w-full lg:max-w-full lg:flex" ]
            [ div [ class "h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden", attribute "style" "background-image: url('/assets/card-left.jpg')", title "Woman holding a mug" ]
                []
            , div [ class "border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal" ]
                [ div [ class "mb-8" ]
                    [ p [ class "text-sm text-gray-600 flex items-center" ]
                        [ svg [ Svg.Attributes.class "fill-current text-gray-500 w-3 h-3 mr-2", viewBox "0 0 20 20", attribute "xmlns" "http://www.w3.org/2000/svg" ]
                            [ Svg.path [ d "M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" ] [] ]
                        , text "Members only      "
                        ]
                    , div [ class "text-gray-900 font-bold text-xl mb-2" ]
                        [ text "Can coffee make you a better developer?" ]
                    , p [ class "text-gray-700 text-base" ]
                        [ text "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." ]
                    ]
                , div [ class "flex items-center" ]
                    [ img [ alt "Avatar of Jonathan Reinink", class "w-10 h-10 rounded-full mr-4", src "/assets/jonathan.jpg" ]
                        []
                    , div [ class "text-sm" ]
                        [ p [ class "text-gray-900 leading-none" ]
                            [ text "Jonathan Reinink" ]
                        , p [ class "text-gray-600" ]
                            [ text "Aug 18" ]
                        ]
                    ]
                ]
            ]
        ]


main : Program () {} ()
main =
    Browser.sandbox
        { init = {}
        , update = \_ model -> model
        , view = view
        }
