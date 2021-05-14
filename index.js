if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

import { AppRegistry } from 'react-native';
import App from './src/screens/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
