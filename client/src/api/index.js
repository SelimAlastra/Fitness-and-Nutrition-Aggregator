import axios from 'axios';

const userUrl = 'http://localhost:5000/users';
const issueUrl = 'http://localhost:5000/issues';
const url = 'http://localhost:5000/posts';

export const fetchUsers = () => axios.get(userUrl);
export const createUser = (newUser) => axios.post(userUrl, newUser);
export const updateUser = (id, updatedUser) => axios.patch(userUrl+'/'+id, updatedUser);
export const deleteUser = (id) => axios.delete(userUrl+'/'+id);


export const fetchIssues = () => axios.get(issueUrl);
export const createIssue = (newIssue) => axios.post(issueUrl, newIssue);
export const deleteIssue = (id) => axios.delete(issueUrl+'/'+id);


export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);