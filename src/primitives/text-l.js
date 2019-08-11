
function h(t) {
    if (!t.includes(",")) return parseInt(t);
    const e = t.split(",").map(t => parseInt(t));
    return Math.floor(Math.random() * (e[1] - e[0] + 1)) + e[0];
}

export default class Text extends HTMLElement {
    constructor() {
        super();
        this.render = () => {
            const t = function(t) {
                const e = ["morbi", "in", "ex", "sit", "amet", "quam", "bibendum", "semper", "donec", "accumsan", "enim", "nibh", "vel", "laoreet", "eros", "feugiat", "sodales", "nullam", "feugiat", "mi", "vitae", "tincidunt", "iaculis", "vestibulum", "ante", "ipsum", "primis", "in", "faucibus", "orci", "luctus", "et", "ultrices", "posuere", "cubilia", "curae", "quisque", "vulputate", "nisi", "eu", "imperdiet", "venenatis", "lacus", "sapien", "tempus", "nibh", "ac", "pretium", "quam", "dolor", "nec", "tellus", "sed", "a", "mauris", "efficitur", "vehicula", "lacus", "non", "varius", "arcu", "proin", "consequat", "quam", "eu", "vulputate", "tincidunt", "dolor", "leo", "pretium", "arcu", "ut", "euismod", "nisl", "sapien", "nec", "lorem", "fusce", "nec", "orci", "in", "enim", "commodo", "tristique", "mauris", "ornare", "ante", "vitae", "sapien", "tempus", "sit", "amet", "porttitor", "ante", "egestas", "in", "malesuada", "tellus", "orci", "eget", "ultricies", "ipsum", "ultrices", "ac", "phasellus", "nec", "felis", "nibh", "morbi", "convallis", "luctus", "ipsum", "nec", "interdum", "pellentesque", "ultrices", "ligula", "erat", "non", "sollicitudin", "odio", "auctor", "at", "duis", "ac", "diam", "id", "dui", "blandit", "tempus", "eget", "sed", "erat", "curabitur", "euismod", "varius", "neque", "cras", "ac", "justo", "congue", "mattis", "urna", "ornare", "semper", "mi"],
                    i = h(t),
                    s = [];
                for (let t = 1; t <= i; t++) {
                    s.push(`<span>${e[Math.floor(Math.random()*e.length)]}</span>`);
                }
                return s.join(" ");
            }(this.words);
            this.innerHTML = `<p>${t}</p>`;
        };
    }
    static get observedAttributes() {
        return ["words"];
    }
    attributeChangedCallback() {
        this.render();
    }
    connectedCallback() {
        this.render();
    }
    get words() {
        return this.getAttribute("words") || "15,20";
    }
    set words(t) {
        return this.setAttribute("words", t);
    }
}

if ("customElements" in window) {
    customElements.define("text-l", Text);
}
