export default class Cluster extends HTMLElement {
    constructor() {
        super();
        this.render = () => {
            this.i = `Cluster-${[this.justify,this.align,this.space].join("")}`;
            this.dataset.i = this.i;
            if (!document.getElementById(this.i)) {
                document.head.innerHTML += `
                <style id="${this.i}">
                    [data-i="${this.i}"] > * {
                        justify-content: ${this.justify};
                        align-items: ${this.align};
                        margin: calc(${this.space} / 2 * -1);
                    }
                    [data-i="${this.i}"] > * > * {
                        margin: calc(${this.space} / 2);
                    }
                </style>
                `.replace(/\s\s+/g, " ").trim();
            }
        };
    }
    get justify() {
        return this.getAttribute("justify") || "center";
    }
    set justify(t) {
        return this.setAttribute("justify", t);
    }
    get align() {
        return this.getAttribute("align") || "center";
    }
    set align(t) {
        return this.setAttribute("align", t);
    }
    get space() {
        return this.getAttribute("space") || "var(--s1)";
    }
    set space(t) {
        return this.setAttribute("space", t);
    }
    static get observedAttributes() {
        return ["justify", "align", "space"];
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback() {
        this.render();
    }
}

if ("customElements" in window) {
    customElements.define("cluster-l", Cluster);
}
