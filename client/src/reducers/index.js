import { combineReducers } from 'redux';

import professional from './professionals';
import services from './services';

export default combineReducers({ professional, services });