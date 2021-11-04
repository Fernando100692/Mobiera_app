// Dependencies
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';

// Components
import {AppContainer} from './src/components/AppContainer';

// Redux Store
import store from './src/redux/store';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppContainer />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
