import axios from 'axios';

const API= axios.create({baseURL:'http://localhost:5000'});

export const baseUrl = 'http://localhost:5000';

export const fetchReports = () => API.get('/reports');
export const createReport = (newReport) => API.post('/reports', newReport);
export const deleteReport = (id) => API.delete(`/reports/${id}`);
export const getReport = (id) => API.get(`/reports/${id}`);

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id,userId) => API.patch(`/posts/${id}/${userId}/likePost`);
export const toggleFavAction = (id) => API.patch(`/posts/${id}/toggleFavAction`);
export const getPost = (id) => API.get(`/posts/${id}`);
export const getPostsFromArray = (bucketId) => API.get(`/posts/${bucketId}/bucket`);

export const getProfessional = (id) => API.get(`/professionalUsers/${id}`);
export const updateProfessional = (id, updatedProfile) => API.patch(`/professionalUsers/update/${id}`, updatedProfile);
export const fetchProfessionalUsers = () => API.get('/professionalUsers');
export const createProfessionalUser = (newUser) => API.post('/professionalUsers', newUser);
export const deleteProfessionalUser = (id) => API.delete(`/professionalUsers/${id}`);

export const getServices = () => API.get('/services');
export const deleteService = (id) => API.delete(`/services/${id}`)
export const addService = (service) => API.post(`/services/add`, service);
export const updateService = (id, updatedService) => API.patch(`/services/update/${id}`, updatedService);

export const getBasicUser = (id) => API.get(`/basicUsers/${id}`);
export const updateBasicUser = (id, updatedBasicUser) => API.patch(`/basicUsers/update/${id}`, updatedBasicUser);
export const fetchBasicUsers = () => API.get('/basicUsers');
export const createBasicUser = (newUser) => API.post('/basicUsers', newUser);
export const deleteBasicUser = (id) => API.delete(`/basicUsers/${id}`);

export const getGoals = () => API.get('/goals');
export const getGoal = (id) => API.get(`/goals/${id}`);
export const updateGoal= (id, updatedGoal) => API.patch(`/goals/${id}`, updatedGoal);
export const deleteGoal = (id) => API.delete(`/goals/${id}`)
export const createGoal = (newGoal) => API.post('/goals', newGoal);

export const getBuckets = () => API.get('/buckets');
export const createBucket = (newBucket) => API.post('/buckets', newBucket);
export const updateBucket = (id, updatedBucket) => API.patch(`/buckets/${id}`, updatedBucket);
export const getBucket = (id) => API.get(`/buckets/${id}`);
export const deleteBucket = (id) => API.delete(`/buckets/${id}`);