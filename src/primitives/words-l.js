
function h(t) {
    if (!t.includes(",")) return parseInt(t);
    const e = t.split(",").map(t => parseInt(t));
    return Math.floor(Math.random() * (e[1] - e[0] + 1)) + e[0];
}

export default class Words extends HTMLElement {
    constructor() {
        super();
        this.generate = () => {
            let t = function(t) {
                const e = ["morbi", "in", "ex", "sit", "amet", "quam", "bibendum", "semper", "donec", "accumsan", "enim", "nibh", "vel", "laoreet", "eros", "feugiat", "sodales", "nullam", "feugiat", "mi", "vitae", "tincidunt", "iaculis", "vestibulum", "ante", "ipsum", "primis", "in", "faucibus", "orci", "luctus", "et", "ultrices", "posuere", "cubilia", "curae", "quisque", "vulputate", "nisi", "eu", "imperdiet", "venenatis", "lacus", "sapien", "tempus", "nibh", "ac", "pretium", "quam", "dolor", "nec", "tellus", "sed", "a", "mauris", "efficitur", "vehicula", "lacus", "non", "varius", "arcu", "proin", "consequat", "quam", "eu", "vulputate", "tincidunt", "dolor", "leo", "pretium", "arcu", "ut", "euismod", "nisl", "sapien", "nec", "lorem", "fusce", "nec", "orci", "in", "enim", "commodo", "tristique", "mauris", "ornare", "ante", "vitae", "sapien", "tempus", "sit", "amet", "porttitor", "ante", "egestas", "in", "malesuada", "tellus", "orci", "eget", "ultricies", "ipsum", "ultrices", "ac", "phasellus", "nec", "felis", "nibh", "morbi", "convallis", "luctus", "ipsum", "nec", "interdum", "pellentesque", "ultrices", "ligula", "erat", "non", "sollicitudin", "odio", "auctor", "at", "duis", "ac", "diam", "id", "dui", "blandit", "tempus", "eget", "sed", "erat", "curabitur", "euismod", "varius", "neque", "cras", "ac", "justo", "congue", "mattis", "urna", "ornare", "semper", "mi"],
                    i = h(t),
                    s = [];
                for (let t = 0; t < i; t++) {
                    s.push(e[Math.floor(Math.random() * e.length)]);
                }
                return s;
            }(this.count);
            return this.capitalize && (t = t.map(t => t.charAt(0).toUpperCase() + t.slice(1))), this.sentence && (t[0] = t[0].charAt(0).toUpperCase() + t[0].slice(1), t[0].toUpperCase(), t[t.length - 1] += ". "), t.join(" ");
        };
        this.render = () => {
            this.innerHTML = "";
            const t = this.repeat ? h(this.repeat) : 1;
            for (let e = 0; e < t; e++) {
                this.innerHTML += this.generate();
            }
        };
    }
    static get observedAttributes() {
        return ["count", "sentence", "capitalize", "repeat"];
    }
    attributeChangedCallback() {
        this.render();
    }
    connectedCallback() {
        this.render();
    }
    get count() {
        return this.getAttribute("count") || "2,3";
    }
    set count(t) {
        return this.setAttribute("count", t);
    }
    get sentence() {
        return this.hasAttribute("sentence");
    }
    set sentence(t) {
        t ? this.setAttribute("sentence", "") : this.removeAttribute("sentence");
    }
    get capitalize() {
        return this.hasAttribute("capitalize");
    }
    set capitalize(t) {
        t ? this.setAttribute("capitalize", "") : this.removeAttribute("capitalize");
    }
    get repeat() {
        this.getAttribute("repeat");
    }
    set repeat(t) {
        this.setAttribute("repeat", t);
    }
}

if ("customElements" in window) {
    customElements.define("words-l", Words);
}
