import React, { useEffect ,useState } from 'react';
import BucketGrid from './BucketsGrid'; 
import { useDispatch } from 'react-redux';

import { getBuckets} from '../../actions/buckets';
import { ListGroup } from 'react-bootstrap';
import './BucketList.css'

const BucketList = () => {
    const [currentBucketId, setCurrentBucketId] = useState(null);
    const dispatch = useDispatch();

       useEffect(() => {
      dispatch(getBuckets());
    }, [currentBucketId,dispatch]);

    return ( 
     <ul className="list-group" >
          <BucketGrid currentBucketId={currentBucketId} setCurrentBucketId={setCurrentBucketId}/>
     </ul>
     );
}

export default BucketList;