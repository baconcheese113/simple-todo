import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';

// Changing to App.js breaks docker ref

ReactDOM.render(<TodoApp />, document.getElementById('root'));
