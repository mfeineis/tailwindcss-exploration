export default class Grid extends HTMLElement {
    constructor() {
        super();
        this.render = () => {
            this.i = `Grid-${[this.min,this.space].join("")}`;
            this.dataset.i = this.i;
            if (!document.getElementById(this.i)) {
                document.head.innerHTML += `
                <style id="${this.i}">
                    [data-i="${this.i}"] {
                        grid-gap: ${this.space};
                    }

                    [data-i="${this.i}"].grid-l--above {
                        grid-template-columns: repeat(auto-fit, minmax(${this.min}, 1fr));
                    }

                    @supports (width: min(${this.min}, 100%)) {
                        [data-i="${this.i}"] {
                            grid-gap: ${this.space};
                            grid-template-columns: repeat(auto-fill, minmax(min(${this.min}, 100%), 1fr));
                        }
                    }
                </style>
                `.replace(/\s\s+/g, " ").trim();
            }
        };
    }
    get min() {
        return this.getAttribute("min") || "250px";
    }
    set min(t) {
        return this.setAttribute("min", t);
    }
    get space() {
        return this.getAttribute("space") || "var(--s0)";
    }
    set space(t) {
        return this.setAttribute("space", t);
    }
    static get observedAttributes() {
        return ["min", "space"];
    }
    connectedCallback() {
        if ("ResizeObserver" in window && !CSS.supports("width", `min(${this.min}, 100%)`)) {
            const t = document.createElement("div");
            t.classList.add("test"), t.style.width = this.min, this.appendChild(t);
            const e = t.offsetWidth;
            this.removeChild(t), new ResizeObserver(t => {
                for (let i of t) {
                    const t = i.contentRect.width > e;
                    this.classList.toggle("grid-l--above", t);
                }
            }).observe(this);
        }
        this.render();
    }
    attributeChangedCallback() {
        this.render();
    }
}

if ("customElements" in window) {
    customElements.define("grid-l", Grid);
}
