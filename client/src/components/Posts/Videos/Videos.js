import React from 'react';
import ReactPlayer from 'react-player';

import useStyles from './styles';


const Videos = ({setUrl}) => {


    return (
         <ReactPlayer width = '379px' height = '200px' controls url = {setUrl} /> 
    )
}

export default Videos;