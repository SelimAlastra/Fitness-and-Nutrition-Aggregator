import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { fade } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import { getBasicUser, updateBasicUser } from '../../actions/basicUsers';
import { getProfessional } from '../../actions/professionals';
/**
 * styles for the searchbox
 */
const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 0, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

var filteredPosts=[];
var filteredProfiles=[];
var finalFilteredProfiles=[];
var newArray=[];
/* var profile;
var profile1;
var profile2; */
const initialFilteredPosts = new Set();

/**
 * 
 */
const SearchBox = ({profile1,updatePosts,setUpdatedPosts}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
/*   useEffect(() => {
    dispatch(getBasicUser(JSON.parse(localStorage.getItem('user'))._id));
    dispatch(getProfessional(JSON.parse(localStorage.getItem('user'))._id));
   }, []);
  
   profile1 = useSelector((state) => state.basicUsers);
    profile2 = useSelector((state) => state.professional); */
   /* if(JSON.parse(localStorage.getItem('user')).type == 'client')
     profile=profile1;
    else
     profile=profile2; */
     console.log(profile1);
  filteredPosts = useSelector((state) => state.posts);
  filteredProfiles = useSelector((state) => state.professional);

  const findTag =(array,searchString)=>{
    for(var i=0; i<array.length;i++)
    {
        if(array[i].trim().toLowerCase()===searchString)
         return true
    } 
    return false
  }
  const filterPosts=(searchString)=>{
    var newFilteredPosts;
    var newFilteredProfiles;

    searchString = searchString.toLowerCase();
    
    newFilteredPosts=filteredPosts.filter((post) => 
              post.title.toLowerCase().includes(searchString) ||
              post.message.toLowerCase().includes(searchString) ||
              post.creator.toLowerCase().includes(searchString) ||
              findTag(post.tags,searchString) 
              );
    newFilteredPosts.forEach(post => initialFilteredPosts.add(post));

    if(filteredProfiles !== undefined && filteredProfiles !== []){
      newFilteredProfiles = filteredProfiles.filter((profile) => 
              profile.name.toLowerCase().includes(searchString)
              );
      finalFilteredProfiles = newFilteredProfiles;
    }
  }
  const initialSearch =() =>{
 /*     if(profile.tags.length>0)
    {
    for(var i=0;i<profile.tags.length;i++)
    {
        filterPosts(profile.tags[i]);
    }
    }   */
    newArray=[];
    initialFilteredPosts.forEach(v => newArray.push(v));
  }
   initialSearch();
  //loadCharacters();
  
  const keyup = (e) => {
    //the user input
    const searchString = e.target.value.toLowerCase();
    initialFilteredPosts.clear();

    //filter posts accordingly
    filterPosts(searchString);
    var newArray=[];
    initialFilteredPosts.forEach(v => newArray.push(v));
    setUpdatedPosts(newArray);

    //if input is empty, reset the filtered profiles
    if ( e.target.value === ""){
      finalFilteredProfiles = [];
    }
  };

  return (
    <>
    <div className="searchbox-container">
      <label className="search-label" htmlFor="search-input">
        <InputBase
            type="text" 
            name="query"
            id="search-input"
            placeholder="Search…" 
            onKeyUp={(e)=>keyup(e)}
            classes={{root: classes.inputRoot, input: classes.inputInput}}
            inputProps={{ 'aria-label': 'search' }}
          />
      </label>
    </div>
    </>
    );
};

export {filteredPosts, newArray, finalFilteredProfiles} ;
export default SearchBox;