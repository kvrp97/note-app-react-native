/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';

// axios.defaults.baseURL = 'http://65.1.2.217:8080/note-collector-app-api-0.0.1-SNAPSHOT/';
axios.defaults.baseURL = 'http://192.168.8.190:8091/';

AppRegistry.registerComponent(appName, () => App);
