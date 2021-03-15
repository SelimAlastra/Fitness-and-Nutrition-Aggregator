import { combineReducers } from 'redux';
import reports from './reports';
import posts from './posts';
import professional from './professionals';
import services from './services';
import basicUsers from './basicUsers';

export default combineReducers({ reports, posts, professional, services, basicUsers });