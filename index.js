import React from '';
import ReactDOM from '';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
}
