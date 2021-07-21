import Engine from "./engine";
export default class Template {
    constructor() {
        this.root = null;
        this.engine = new Engine();
    }

    render(com, data) {
        let dom = this.engine.render(com, data);
        console.log("html>>>", dom);
        this.root.appendChild(dom);
    }

    mounted(dom) {
        this.root = dom;
        return this;
    }
}
