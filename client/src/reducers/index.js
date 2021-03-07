import { combineReducers } from 'redux';

import professional from './professionals';
import services from './services';
import users  from './users';

export default combineReducers({ professional, services, users });