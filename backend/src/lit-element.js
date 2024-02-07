import { LitElement, css, html, property } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';
import { __decorate } from 'https://cdn.jsdelivr.net/npm/tslib@2.6.2/+esm';
export class LitGreeter extends LitElement {
    constructor() {
        super(...arguments);
        this.header = 'Hey there';
        this.counter = 5;
    }
    __increment() {
        this.counter += 1;
    }
    render() {
        return html `
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
    }
}
LitGreeter.styles = css `
    :host {
      display: block;
      padding: 25px;
      color: var(--lit-greeter-text-color, #000);
    }
  `;
__decorate([
    property({ type: String })
], LitGreeter.prototype, "header", void 0);
__decorate([
    property({ type: Number })
], LitGreeter.prototype, "counter", void 0);
//# sourceMappingURL=LitGreeter.js.map
customElements.define('lit-greeter', LitGreeter);