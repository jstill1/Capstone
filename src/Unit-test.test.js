import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('sucessfully render all 3 components without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});