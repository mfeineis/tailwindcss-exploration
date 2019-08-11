export default class Box extends HTMLElement {
    constructor() {
        super();
        this.render = () => {
            this.i = `Box-${[this.padding,this.borderWidth,this.invert].join("")}`;
            this.dataset.i = this.i;
            if (!document.getElementById(this.i)) {
                document.head.innerHTML += `
                <style id="${this.i}">
                    [data-i="${this.i}"] {
                        padding: ${this.padding};
                        border: ${this.borderWidth} solid;
                        ${this.invert ? "background-color: var(--color-light); filter: invert(100%);" : ""}
                    }
                    [data-i="${this.i}"] {
                        background-color: inherit;
                    }
                </style>
                `.replace(/\s\s+/g, " ").trim();
            }
        };
    }
    get padding() {
        return this.getAttribute("padding") || "var(--s1)";
    }
    set padding(t) {
        return this.setAttribute("padding", t);
    }
    get borderWidth() {
        return this.getAttribute("borderWidth") || "var(--border-thin)";
    }
    set borderWidth(t) {
        return this.setAttribute("borderWidth", t);
    }
    static get observedAttributes() {
        return ["borderWidth", "padding", "invert"];
    }
    get invert() {
        return this.hasAttribute("invert");
    }
    set invert(t) {
        return t ? this.setAttribute("invert", "") : this.removeAttribute("invert");
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback() {
        this.render();
    }
}

if ("customElements" in window) {
    customElements.define("box-l", Box);
}
