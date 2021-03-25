import React from 'react';
import Iframe from 'react-iframe';

import useStyles from './styles';


const FacebookLinks = ({setLink}) => {


    return (
         <Iframe url = {setLink} width="500" height="541" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"/> 
    );
}

export default FacebookLinks;