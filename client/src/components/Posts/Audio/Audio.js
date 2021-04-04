import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

import useStyles from './styles';


const Audio = ({setSrc}) => {


    return (
         <ReactAudioPlayer width = '382px' minHeight = '200px' src = {setSrc} autoPlay controls/> 
    );
}

export default Audio;