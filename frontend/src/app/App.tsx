import React, {createElement, useEffect} from 'react';
import './App.css';

const johnWebComp = `class HelloJohnComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log('console john greeter');
    this.innerHTML = \`<h1>Hello John</h1><button>post</button>\`;
  }
}

customElements.define('hello-john', HelloJohnComponent);`


const ThirdPartyWidget = ({src, tag}: { src: string, tag: string }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.innerHTML = src;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    })
    return createElement(tag);
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <ThirdPartyWidget src={johnWebComp} tag={'hello-john'}/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
