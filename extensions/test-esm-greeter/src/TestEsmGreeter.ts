import { LitElement, css, html } from 'lit';

export class TestEsmGreeter extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--test-esm-greeter-text-color, #000);
    }
  `;

  accessor header = 'Hey there';

  accessor counter = 5;

  __increment() {
    this.counter += 1;
    console.log('incremented', this.counter);
  }

  render() {
    return html`
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}
