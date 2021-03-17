import { combineReducers } from 'redux';
import users from './users';
import issues from './issues';
import posts from './posts';
import professional from './professionals';
import services from './services';
import basicUsers from './basicUsers';
import goals from "./goals"

export default combineReducers({ users, issues, posts, professional, services, basicUsers, goals });