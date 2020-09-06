import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import Engine from './engine';
import Preload from './Preload';

export default class App extends Component {
  state = {
    ready: false
  }

  async _loadAssetsAsync() {
    await Promise.all([
      ...Preload.images.map(x => Asset.fromModule(x).downloadAsync()),
    ])
  }

  render() {
    if (!this.state.ready) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ ready: true })}
        />
      );
    }

    return (
      <Engine />
    );
  }
}
