import React from 'react';
import ReactDOM from 'react-dom';
import r2wc from 'react-to-webcomponent';


const Foo = () => {
    return (
        <div>
            <h1>hello world</h1>
        </div>
    )
}
// class MyCounter extends React.Component {
//     constructor() {
//         super();
//         this.state = { count: 0 };
//     }

//     render() {
//         return (
//             <>
//             <div>
//                 <p>Count: {this.state.count}</p>
//                 <button onClick={() => this.setState(prev => ({ count: prev.count + 1 }))}>
//                     Increment
//                 </button>
//             </div>
//             </>
//         );
//     }
// }
customElements.define('hello-marco', r2wc(Foo, React, ReactDOM));
// ReactDOM.render(<MyCounter />, document.getElementById('root'));