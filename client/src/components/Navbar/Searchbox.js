import React,{useEffect} from 'react';
import './Navbar.css';
import { fade } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import {associatedTags} from '../../quiz/quizUser';
import { useDispatch, useSelector } from 'react-redux';
import { getBasicUser, getBasicUsers, updateBasicUser } from '../../actions/basicUsers';
import { getProfessional, getProfessionalUsers } from '../../actions/professionals';
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

  /**
   * filter posts according to input value
   */
  const filterPosts=(searchString)=>{
    var newFilteredPosts;
    
    newFilteredPosts=filteredPosts.filter((post) => 
              post.title.toLowerCase().includes(searchString) ||
              post.message.toLowerCase().includes(searchString) ||
              post.creator.toLowerCase().includes(searchString) ||
              findTag(post.tags,searchString) 
              );
   newFilteredPosts.forEach(post => initialFilteredPosts.add(post));
  }

  /**
   * filter profiles according to input value
   */
  const filterProfiles = (searchString) => {
    var newFilteredProfiles;

    if(filteredProfiles!=null && filteredProfiles !== []){
      newFilteredProfiles = filteredProfiles.filter((profile) => profile.username.toLowerCase().includes(searchString));
      finalFilteredProfiles = newFilteredProfiles;
    } else {
      finalFilteredProfiles = [];
    }
  }

  const InitialSearch =() =>{
    var tags;
    var profile1;
    var profile2;
    var profile;
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(getBasicUser(JSON.parse(localStorage.getItem('user'))._id));
     dispatch(getProfessional(JSON.parse(localStorage.getItem('user'))._id));
    }, [dispatch]);
    profile1 = useSelector((state) => state.basicUsers);
    profile2 = useSelector((state) => state.professional); 
    if(JSON.parse(localStorage.getItem('user')).type == 'client'){
      if(profile1.tags){
        tags=profile1.tags;
      }
      
      profile=profile1;
    } else {
      if(profile2.tags)
        tags=profile2.tags;
      profile=profile2;
    }
    
    if(associatedTags.length>0) { 
      tags=associatedTags;
      const newBasicUser = {
        name:profile.name,
        username: profile.username,
        email: profile.email,
        password: profile.password,
        address: profile.address,
        gender: profile.gender,
        bodyType: profile.bodyType,
        weight: profile.weight,
        bio: profile.bio,
        tags:associatedTags,
        goals: profile.goals,
        isBanned: profile.isBanned,
        dob: profile.dob,
        bundles: profile.bundles
    }
   dispatch(updateBasicUser(JSON.parse(localStorage.getItem('user'))._id, newBasicUser));
    }
    if(tags !== undefined){
      for(var i=0;i<tags.length;i++) {
        filterPosts(tags[i]);
    } 
  } 
    newArray=[];
    initialFilteredPosts.forEach(v => newArray.push(v));
  }
   InitialSearch();
  //loadCharacters();
  
  const keyup = (e) => {
    // the user input
    const searchString = e.target.value.toLowerCase();
    initialFilteredPosts.clear();

    // filter posts
    filterPosts(searchString);
    var newArray=[];
    initialFilteredPosts.forEach(v => newArray.push(v));
    setUpdatedPosts(newArray);

    // filter profiles
    filterProfiles(searchString);

    // if input is empty, reset the filtered profiles
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
            data-testid="searchBox"
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