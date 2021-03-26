import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

import useStyles from './styles';


const Audio = ({setSrc}) => {


    return (
         <ReactAudioPlayer width = '300px' height = '250px' src = {setSrc} autoPlay controls/> 
    );
}

export default Audio;