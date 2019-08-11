export default class Image extends HTMLElement {
    constructor() {
        super();
        this.render = () => {
            this.i = `Image-${[this.ratio,this.minWidth,this.maxWidth].join("")}`;
            this.dataset.i = this.i;
            if (!document.getElementById(this.i)) {
                document.head.innerHTML += `
                <style id="${this.i}">
                    [data-i="${this.i}"] {
                        max-width: ${this.maxWidth};
                        min-width: ${this.minWidth};
                    }
                    [data-i="${this.i}"]::after {
                        padding-top: ${function(t){
                            const e=t.split(":").map(t=>parseInt(t));
                            return e[0]/e[1]*100;
                        }(this.ratio)+"%"};
                    }
                </style>
                `;
            }
        };
    }
    static get observedAttributes() {
        return ["ratio", "minWidth", "maxWidth"];
    }
    get ratio() {
        return this.getAttribute("ratio") || "6:9";
    }
    set ratio(t) {
        return this.setAttribute("ratio", t);
    }
    get minWidth() {
        return this.getAttribute("minWidth") || "0";
    }
    set minWidth(t) {
        return this.setAttribute("minWidth", t);
    }
    get maxWidth() {
        return this.getAttribute("maxWidth") || "none";
    }
    set maxWidth(t) {
        return this.setAttribute("maxWidth", t);
    }
    attributeChangedCallback() {
        this.setAttribute("aria-label", `Image with ${this.ratio} ratio`), this.render();
    }
    connectedCallback() {
        this.setAttribute("role", "img");
        this.render();
    }
}

if ("customElements" in window) {
    customElements.define("image-l", Image);
}
