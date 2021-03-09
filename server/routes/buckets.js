import express from 'express';

import { getBuckets, createBucket, updateBucket} from '../controllers/buckets.js';

const router = express.Router();

router.get('/', getBuckets);
router.post('/', createBucket);
router.patch('/:id', updateBucket);

export default router;
