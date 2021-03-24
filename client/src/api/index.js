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
const bucketUrl = 'http://localhost:5000/buckets';


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
export const addToBucket = (id, bucketId) => API.patch(`${url}/${id}/addToBucket`, bucketId);
export const getPost = (id) => axios.get(`${url}/${id}`);
export const getPostsFromArray = (bucketId) => axios.get(`${url}/${bucketId}/bucket`);

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
export const fetchBasicUsers = () => axios.get(basicUserUrl);
export const createBasicUser = (newUser) => axios.post(basicUserUrl, newUser);
export const deleteBasicUser = (id) => axios.delete(`${basicUserUrl}/${id}`);

export const fetchBuckets = () => axios.get(bucketUrl);
export const createBucket = (newBucket) => axios.post(bucketUrl, newBucket);
export const updateBucket = (id, updatedBucket) => axios.patch(`${bucketUrl}/${id}`, updatedBucket);
export const getBucket = (id) => axios.get(`${bucketUrl}/${id}`);
export const deleteBucket = (id) => axios.delete(`${bucketUrl}/${id}`);