export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._renderedItems.forEach(object => this._renderer(object))
    }

    addItem(element) {
        this._container.prepend(element)
    }
}