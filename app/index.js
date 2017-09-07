import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import MainNavigation from './navigation';

export default class App extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <Provider store={store}>
        <MainNavigation/>
      </Provider>
    );
  }
}
