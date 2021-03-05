import axios from "axios";

const professionalUsersUrl = "http://localhost:5000/professionalUsers";
export const getProfessional = (id) => axios.get(`${professionalUsersUrl}/${id}`);


const servicesUrl = "http://localhost:5000/services";
export const getServices = () => axios.get(servicesUrl);
