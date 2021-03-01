import { combineReducers } from "redux";
import users from './users';
import issues from './issues';

export default combineReducers({ users, issues });