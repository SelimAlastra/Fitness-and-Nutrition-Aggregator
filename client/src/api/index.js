import axios from "axios";

const url = "http://localhost:5000/professionalUsers";

export const getProfessional = (id) => axios.get(`${url}/${id}`);