import { combineReducers } from 'redux';
import users from './users';
import issues from './issues';
import posts from './posts';
import buckets from './buckets';
import professional from './professionals';
import services from './services';
import basicUsers from './basicUsers';

export default combineReducers({ users, issues, posts, buckets, professional, services, basicUsers });
