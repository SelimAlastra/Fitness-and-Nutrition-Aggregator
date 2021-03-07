import axios from "axios";

// Professional Users
const professionalUsersUrl = 'http://localhost:5000/professionalUsers';
export const getProfessional = (id) => axios.get(`${professionalUsersUrl}/${id}`);
export const updateProfessional = (id, updatedProfile) => axios.post(`${professionalUsersUrl}/update/${id}`, updatedProfile);


// Services
const servicesUrl = 'http://localhost:5000/services';
export const getServices = () => axios.get(servicesUrl);
export const deleteService = (id) => axios.delete(`${servicesUrl}/${id}`)
export const addService = (service) => axios.post(`${servicesUrl}/add`, service);


// Users
const userUrl = 'http://localhost:5000/basicUsers';
export const getBasicUser = (id) => axios.get(`${userUrl}/${id}`);