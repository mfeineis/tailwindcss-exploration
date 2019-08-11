export default class Center extends HTMLElement {
    constructor() {
        super();
        this.render = () => {
            this.i = `Center-${[this.max,this.andText,this.gutters,this.intrinsic].join("")}`;
            this.dataset.i = this.i;
            if (!document.getElementById(this.i)) {
                document.head.innerHTML += `
                <style id="${this.i}">
                    [data-i="${this.i}"] {
                        max-width: ${this.max};
                        ${this.gutters ? `padding-left: ${this.gutters}; padding-right: ${this.gutters};`:""}
                        ${this.andText ? "text-align: center;" : ""}
                        ${this.intrinsic ? "display: flex; flex-direction: column; align-items: center" : ""}
                    }
                </style>
                `.replace(/\s\s+/g, " ").trim();
            }
        };
    }
    get max() {
        return this.getAttribute("max") || "var(--measure)";
    }
    set max(t) {
        return this.setAttribute("max", t);
    }
    get andText() {
        return this.hasAttribute("andText");
    }
    set andText(t) {
        return t ? this.setAttribute("andText", "") : this.removeAttribute("andText");
    }
    get gutters() {
        return this.getAttribute("gutters") || null;
    }
    set gutters(t) {
        return this.setAttribute("gutters", t);
    }
    get intrinsic() {
        return this.hasAttribute("intrinsic");
    }
    set intrinsic(t) {
        return t ? this.setAttribute("intrinsic", "") : this.removeAttribute("intrinsic");
    }
    static get observedAttributes() {
        return ["max", "andText", "gutters", "intrinsic"];
    }
    connectedCallback() {
        this.render();
    }
    attributeChangedCallback() {
        this.render();
    }
}

if ("customElements" in window) {
    customElements.define("center-l", Center);
}
