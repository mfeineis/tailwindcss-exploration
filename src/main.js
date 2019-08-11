/* global Elm */
import "./main.css";
import "./primitives/box-l";
import "./primitives/center-l";
import "./primitives/cluster-l";
import "./primitives/cover-l";
import "./primitives/grid-l";
import "./primitives/image-l";
import "./primitives/sidebar-l";
import "./primitives/stack-l";
import "./primitives/switcher-l";
import "./primitives/text-l";
import "./primitives/words-l";

var app = Elm.App.init({
    node: document.querySelector("#root"),
});

console.log("Elm.App", app, Elm);

