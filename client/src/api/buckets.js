import axios from 'axios';

const url = 'http://localhost:5000/buckets';

export const fetchBuckets = () => axios.get(url);
export const createBucket = (newBucket) => axios.post(url, newBucket);
export const updateBucket = (id, updatedBucket) => axios.patch(`${url}/${id}`, updatedBucket);


