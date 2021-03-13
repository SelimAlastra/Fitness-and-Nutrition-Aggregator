import express from 'express';

import { getBuckets, createBucket} from '../controllers/buckets.js';

const router = express.Router();

router.get('/', getBuckets);
router.post('/', createBucket);

export default router;
