import { details } from './quizUser';
import { useDispatch, useSelector } from 'react-redux';
import { getBasicUser, getBasicUsers, updateBasicUser } from '../actions/basicUsers';
import { getProfessional, getProfessionalUsers } from '../actions/professionals';
import { createGoal } from '../actions/goals';
import React,{useEffect} from 'react';

