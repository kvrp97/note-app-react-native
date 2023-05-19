/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';

axios.defaults.baseURL = 'http://13.126.175.133:8080/note-collector-app-api-0.0.1-SNAPSHOT/';

AppRegistry.registerComponent(appName, () => App);
