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
const userUrl = 'http://localhost:5000/users';
const issueUrl = 'http://localhost:5000/issues';
const url = 'http://localhost:5000/posts';

const professionalUsersUrl = 'http://localhost:5000/professionalUsers';
const servicesUrl = 'http://localhost:5000/services';
const basicUserUrl = 'http://localhost:5000/basicUsers';

export const fetchUsers = () => axios.get(userUrl);
export const createUser = (newUser) => axios.post(userUrl, newUser);
export const updateUser = (id, updatedUser) => axios.patch(userUrl+'/'+id, updatedUser);
export const deleteUser = (id) => axios.delete(userUrl+'/'+id);


export const fetchIssues = () => axios.get(issueUrl);
export const createIssue = (newIssue) => axios.post(issueUrl, newIssue);
export const deleteIssue = (id) => axios.delete(issueUrl+'/'+id);


export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const toggleFavAction = (id) => API.patch(`/posts/${id}/toggleFavAction`);

export const getProfessional = (id) => axios.get(`${professionalUsersUrl}/${id}`);
export const updateProfessional = (id, updatedProfile) => axios.patch(`${professionalUsersUrl}/update/${id}`, updatedProfile);

export const getServices = () => axios.get(servicesUrl);
export const deleteService = (id) => axios.delete(`${servicesUrl}/${id}`)
export const addService = (service) => axios.post(`${servicesUrl}/add`, service);

export const getBasicUser = (id) => axios.get(`${basicUserUrl}/${id}`);
export const updateBasicUser = (id, updatedBasicUser) => axios.patch(`${basicUserUrl}/update/${id}`, updatedBasicUser);

