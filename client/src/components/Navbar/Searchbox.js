import React from 'react';
import './Navbar.css';
import { fade } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { useSelector } from 'react-redux';
import {associatedTags} from '../../quiz/quizUser';

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
const initialFilteredPosts = new Set();

/**
 * 
 */
const SearchBox = ({updatePosts,setUpdatedPosts}) => {
  const classes = useStyles();
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
    for(var i=0;i<associatedTags.length;i++)
    {
        filterPosts(associatedTags[i]);
    }
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