import { combineReducers } from 'redux';
import reports from './reports';
import posts from './posts';
import buckets from './buckets';
import professional from './professionals';
import services from './services';
import basicUsers from './basicUsers';
import goals from "./goals"


export default combineReducers({ reports, posts, buckets, professional, services, basicUsers, goals });

