import React from 'react';
import ReactDOM from 'react-dom';
import { Root, configureStore } from 'app/config';

export const store = configureStore();

ReactDOM.render(<Root store={store} />, document.querySelector('#root'));
