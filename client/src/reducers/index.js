import { combineReducers } from 'redux';
import issues from './issues';
import posts from './posts';
import professional from './professionals';
import services from './services';
import basicUsers from './basicUsers';

export default combineReducers({ issues, posts, professional, services, basicUsers });