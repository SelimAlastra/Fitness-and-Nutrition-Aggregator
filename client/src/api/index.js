import axios from 'axios';

const API= axios.create({baseURL:'http://localhost:5000'});


/* API.interceptors.request.use((req) => {
  console.log( localStorage.getItem('user'));
    if (localStorage.getItem('user')) {
      req.headers.Authorization = ` ${JSON.parse(localStorage.getItem('user')).token}`;
    }
    console.log( req.headers.Authorization);
    return req;
  });
 */

const url = 'http://localhost:5000/posts';
const reportUrl = 'http://localhost:5000/reports';
const professionalUsersUrl = 'http://localhost:5000/professionalUsers';
const servicesUrl = 'http://localhost:5000/services';
const basicUserUrl = 'http://localhost:5000/basicUsers';
const goalUrl = 'http://localhost:5000/goals';


export const fetchReports = () => axios.get(reportUrl);
export const createReport = (newReport) => axios.post(reportUrl, newReport);
export const deleteReport = (id) => axios.delete(reportUrl+'/'+id);
export const getReport = (id) => axios.get(`${reportUrl}/${id}`);

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id,userId) => API.patch(`/posts/${id}/${userId}/likePost`);
export const toggleFavAction = (id) => API.patch(`/posts/${id}/toggleFavAction`);
export const getPost = (id) => axios.get(`${url}/${id}`);

export const getProfessional = (id) => axios.get(`${professionalUsersUrl}/${id}`);
export const updateProfessional = (id, updatedProfile) => axios.patch(`${professionalUsersUrl}/update/${id}`, updatedProfile);
export const fetchProfessionalUsers = () => axios.get(professionalUsersUrl);
export const createProfessionalUser = (newUser) => axios.post(professionalUsersUrl, newUser);
export const deleteProfessionalUser = (id) => axios.delete(`${professionalUsersUrl}/${id}`);

export const getServices = () => axios.get(servicesUrl);
export const deleteService = (id) => axios.delete(`${servicesUrl}/${id}`)
export const addService = (service) => axios.post(`${servicesUrl}/add`, service);
export const updateService = (id, updatedService) => axios.patch(`${servicesUrl}/update/${id}`, updatedService);

export const getBasicUser = (id) => axios.get(`${basicUserUrl}/${id}`);
export const updateBasicUser = (id, updatedBasicUser) => axios.patch(`${basicUserUrl}/update/${id}`, updatedBasicUser);

export const getGoals = () => axios.get(goalUrl);
export const getGoal = (id) => axios.get(`${goalUrl}/${id}`);
export const updateGoal= (id, updatedGoal) => axios.patch(`${goalUrl}/${id}`, updatedGoal);
export const deleteGoal = (id) => axios.delete(`${goalUrl}/${id}`)
export const fetchBasicUsers = () => axios.get(basicUserUrl);
export const createBasicUser = (newUser) => axios.post(basicUserUrl, newUser);
export const deleteBasicUser = (id) => axios.delete(`${basicUserUrl}/${id}`);
