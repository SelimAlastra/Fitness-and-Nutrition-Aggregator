import express from 'express';

import { getBuckets, createBucket, updateBucket, getBucket, deleteBucket } from '../controllers/buckets.js';

const router = express.Router();

router.get('/', getBuckets);
router.get('/:id', getBucket);
router.post('/', createBucket);
router.patch('/:id', updateBucket);
router.delete('/:id', deleteBucket);

export default router;
