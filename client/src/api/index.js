import axios from 'axios';

const reportUrl = 'http://localhost:5000/reports';
const url = 'http://localhost:5000/posts';

const professionalUsersUrl = 'http://localhost:5000/professionalUsers';
const servicesUrl = 'http://localhost:5000/services';
const basicUserUrl = 'http://localhost:5000/basicUsers';


export const fetchReports = () => axios.get(reportUrl);
export const createReport = (newReport) => axios.post(reportUrl, newReport);
export const deleteReport = (id) => axios.delete(reportUrl+'/'+id);


export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const getProfessional = (id) => axios.get(`${professionalUsersUrl}/${id}`);
export const updateProfessional = (id, updatedProfile) => axios.patch(`${professionalUsersUrl}/update/${id}`, updatedProfile);
export const fetchProfessionalUsers = () => axios.get(professionalUsersUrl);
export const createProfessionalUser = (newUser) => axios.post(professionalUsersUrl, newUser);
export const deleteProfessionalUser = (id) => axios.delete(`${professionalUsersUrl}/${id}`);

export const getServices = () => axios.get(servicesUrl);
export const deleteService = (id) => axios.delete(`${servicesUrl}/${id}`)
export const addService = (service) => axios.post(`${servicesUrl}/add`, service);

export const getBasicUser = (id) => axios.get(`${basicUserUrl}/${id}`);
export const updateBasicUser = (id, updatedBasicUser) => axios.patch(`${basicUserUrl}/update/${id}`, updatedBasicUser);
export const fetchBasicUsers = () => axios.get(basicUserUrl);
export const createBasicUser = (newUser) => axios.post(basicUserUrl, newUser);
export const deleteBasicUser = (id) => axios.delete(`${basicUserUrl}/${id}`);
