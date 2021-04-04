import React from 'react';
import Iframe from 'react-iframe';

import useStyles from './styles';


const EmbeddedLinks = ({setLink}) => {


    return (
         <Iframe url = {setLink} position="relative" width = '382px' height = '205px' allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/> 
    );
}

export default EmbeddedLinks;