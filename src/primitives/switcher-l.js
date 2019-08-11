export default class Switcher extends HTMLElement {
    constructor() {
        super();
        this.render = () => {
            this.i = `Switcher-${[this.threshold,this.space,this.limit].join("")}`;
            this.dataset.i = this.i;
            this.adjustedSpace = "0" === this.space ? "0px" : this.space;
            if (!document.getElementById(this.i)) {
                document.head.innerHTML += `
                <style id="${this.i}">
                    [data-i="${this.i}"] > * {
                        margin: calc((${this.adjustedSpace} / 2) * -1);
                    }

                    [data-i="${this.i}"] > * > * {
                        flex-basis: calc((${this.threshold} - (100% - ${this.adjustedSpace})) * 999);
                        margin: calc(${this.adjustedSpace} / 2);
                    }

                    [data-i="${this.i}"] > * > :nth-last-child(n+${parseInt(this.limit)+1}),
                    [data-i="${this.i}"] > * > :nth-last-child(n+${parseInt(this.limit)+1}) ~ * {
                        flex-basis: 100%;
                    }
                </style>
                `.replace(/\s\s+/g, " ").trim();
            }
        };
    }
    get threshold() {
        return this.getAttribute("threshold") || "var(--measure)";
    }
    set threshold(t) {
        return this.setAttribute("threshold", t);
    }
    get space() {
        return this.getAttribute("space") || "var(--s1)";
    }
    set space(t) {
        return this.setAttribute("space", t);
    }
    get limit() {
        return this.getAttribute("limit") || "5";
    }
    set limit(t) {
        return this.getAttribute("limit", t);
    }
    static get observedAttributes() {
        return ["threshold", "space", "limit"];
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback() {
        this.render();
    }
}

if ("customElements" in window) {
    customElements.define("switcher-l", Switcher);
}
