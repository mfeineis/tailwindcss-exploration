/**
 * @module sidebar-l
 * @description
 * A custom element for placing two elements side-by-side. If space permits, the sidebar element has a set width, and the companion takes up the rest of the available horizontal space. If not, the elements are collapsed into a single column, each taking up 100% of the horizontal space.
 * @property {string} side=left Which element to treat as the sidebar (all values but "left" are considered "right")
 * @property {string} sideWidth Represents the width of the sidebar _when_ adjacent. If not set (`null`) it defaults to the sidebar's content width
 * @property {string} contentMin=50% A CSS **percentage** value. The minimum width of the content element in the horizontal configuration
 * @property {string} space=var(--s1) A CSS margin value representing the space between the two elements
 * @property {boolean} noStretch=false Make the adjacent elements adopt their natural height
 */
export default class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.render = () => {
            this.contentMin.includes("%") || console.warn("The value for each <sidebar-l> `contentMin` property should be a percentage. Otherwise overflow is likely to occur");
            this.i = `Sidebar-${[this.side,this.sideWidth,this.contentMin,this.space].join("")}`;
            this.dataset.i = this.i;
            this.adjustedSpace = "0" === this.space ? "0px" : this.space;

            if (!document.getElementById(this.i)) {
                document.head.innerHTML += `
                <style id="${this.i}">
                    [data-i="${this.i}"] > * {
                        margin: calc(${this.adjustedSpace} / 2 * -1);
                        ${this.noStretch?"align-items: flex-start;":""}
                    }
                    [data-i="${this.i}"] > * > * {
                        margin: calc(${this.adjustedSpace} / 2);
                        ${this.sideWidth?`flex-basis: ${this.sideWidth};`:""}
                    }
                    [data-i="${this.i}"] > * > ${"left"!==this.side?":first-child":":last-child"} {
                        flex-basis: 0;
                        flex-grow: 999;
                        min-width: calc(${this.contentMin} - ${this.adjustedSpace});
                    }
                </style>
                `.replace(/\s\s+/g, " ").trim();
            }
        };
    }
    get side() {
        return this.getAttribute("side") || "left";
    }
    set side(t) {
        return this.setAttribute("side", t);
    }
    get sideWidth() {
        return this.getAttribute("sideWidth") || null;
    }
    set sideWidth(t) {
        return this.setAttribute("sideWidth", t);
    }
    get contentMin() {
        return this.getAttribute("contentMin") || "50%";
    }
    set contentMin(t) {
        return this.setAttribute("contentMin", t);
    }
    get space() {
        return this.getAttribute("space") || "var(--s1)";
    }
    set space(t) {
        return this.setAttribute("space", t);
    }
    get noStretch() {
        return this.hasAttribute("noStretch");
    }
    set noStretch(t) {
        t ? this.setAttribute("noStretch", "") : this.removeAttribute("noStretch");
    }
    static get observedAttributes() {
        return ["side", "sideWidth", "contentMin", "space", "noStretch"];
    }
    connectedCallback() {
        this.children[0].children.length > 2 ? console.error("<sidebar-l> elements should have exactly one child element containing exactly two child elements of its own") : this.render();
    }
    attributeChangedCallback(t) {
        this.render();
    }
}

if ("customElements" in window) {
    customElements.define("sidebar-l", Sidebar);
}
