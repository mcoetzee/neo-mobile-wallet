import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainNavigation from './navigation';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
