import React from 'react';
import ReactPlayer from 'react-player';

import useStyles from './styles';


const Videos = ({setUrl}) => {


    return (
         <ReactPlayer width = '300px' height = '250px' controls url = {setUrl} /> 
    );
}

export default Videos;