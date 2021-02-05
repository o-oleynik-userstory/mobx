import App from 'app';
import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.less';

const root = document.getElementById('root');

/**
 * Вывести приложение.
 */
function renderApp() {
    ReactDOM.render(<App />, root);
}

renderApp();

if (module.hot) {
    module.hot.accept('app', renderApp);
}
