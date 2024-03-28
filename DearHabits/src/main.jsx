import React from 'react'
// import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(  
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

// ReactDOM.createRoot(document.getElementById('root'));
// ReactDOM.hydrate(<App />, document.getElementById("root"));
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
