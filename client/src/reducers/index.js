import { combineReducers } from "redux";
import users from './users';
import issues from './issues';
import posts from './posts';

export default combineReducers({ users, issues, posts });