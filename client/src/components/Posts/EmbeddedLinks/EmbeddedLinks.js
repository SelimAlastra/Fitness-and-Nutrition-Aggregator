import React from 'react';
import Iframe from 'react-iframe';

import useStyles from './styles';


const EmbeddedLinks = ({setLink}) => {


    return (
         <Iframe url = {setLink} width = '100%' height = '100%' display="initial" position="relative"/> 
    );
}

export default EmbeddedLinks;