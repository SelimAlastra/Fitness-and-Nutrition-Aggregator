import React,{useEffect} from 'react';
import './Navbar.css';
import { fade } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import {associatedTags} from '../../quiz/quizUser';
import { useDispatch, useSelector } from 'react-redux';
import { getBasicUser, updateBasicUser } from '../../actions/basicUsers';
import { getProfessionalUsers, updateProfessional } from '../../actions/professionals';
import { details } from '../../quiz/quizUser';

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
var profiles = [];
var finalFilteredProfiles=[];
var newArray=[];
const initialFilteredPosts = new Set();

/**
 * 
 */
const SearchBox = ({updatePosts,setUpdatedPosts}) => {
  const classes = useStyles();
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfessionalUsers());
    if (JSON.parse(localStorage.getItem('user')).type === 'client') {
      dispatch(getBasicUser(JSON.parse(localStorage.getItem('user'))._id));
    }
   }, [dispatch]);

  filteredPosts = useSelector((state) => state.posts);
  profiles = useSelector((state) => state.professional);
  // console.log(profiles);

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

    if(searchString !== ""){
      newFilteredProfiles = profiles.filter((profile) => profile.username.toLowerCase().includes(searchString));
      //console.log("filtered profiles: " + newFilteredProfiles);
      finalFilteredProfiles = newFilteredProfiles;
    } else {
      finalFilteredProfiles = [];
    }
  }

  const InitialSearch =() =>{
    const dispatch = useDispatch();

    var profile;
    var tags;

    var clientx = useSelector((state) => state.basicUsers);
    var professionalx = useSelector((state) => JSON.parse(localStorage.getItem('user')).type === 'professional' ? state.professional.filter((p) => p._id === JSON.parse(localStorage.getItem('user'))._id) : null);
    

    if(JSON.parse(localStorage.getItem('user')).type === 'client'){
      profile = clientx;
    } else if(JSON.parse(localStorage.getItem('user')).type === 'professional') {
      profile = professionalx;
    }

    if(profile.tags){
      tags=profile.tags;
    }
    
    // update the client profile
    if(associatedTags.length>0 && JSON.parse(localStorage.getItem('user')).type === 'client'){ 
        tags = associatedTags;
        const newBasicUser = {
        username: profile.username,
        name: profile.name,
        email: profile.email,
        password: profile.password,
        gender: details.gender,
        dob: profile.dob,
        address: profile.address,
        isBanned: profile.isBanned,
        bodyType: profile.bodyType,
        weight: details.weight,
        height: details.height,
        goals: details.goals,
        tags: associatedTags,
        bio: profile.bio,
        resetPasswordLink: profile.resetPasswordLink,
        bundles: profile.bundles,
        buckets: profile.buckets
        }
        dispatch(updateBasicUser(JSON.parse(localStorage.getItem('user'))._id, newBasicUser));
      } 
      // update the professional profile
      else if(associatedTags.length>0 && JSON.parse(localStorage.getItem('user')).type === 'professional') {
        tags = associatedTags;
        const newProfessional = {
        username: profile.username,
        name: profile.name,
        email: profile.email,
        password: profile.password,
        profession: profile.profession,
        gender: details.gender,
        dob: profile.dob,
        address: profile.address,
        isBanned: profile.isBanned,
        tags: associatedTags,
        yearsOfExperience: details.yearsOfExperience,
        bio: profile.bio,
        instagramLink: profile.instagramLink,
        youtubeLink: profile.youtubeLink,
        resetPasswordLink: profile.resetPasswordLink
        }
        dispatch(updateProfessional(JSON.parse(localStorage.getItem('user'))._id, newProfessional));
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
  
  /**
   * 
   * 
   */
  const keyup = (e) => {
    // the user input
    const searchString = e.target.value.toLowerCase();
    initialFilteredPosts.clear();

    // filter posts
    filterPosts(searchString);
    console.log(finalFilteredProfiles);
    var newArray=[];
    initialFilteredPosts.forEach(v => newArray.push(v));
    setUpdatedPosts(newArray);

    // filter profiles
    filterProfiles(searchString);

    // if input is empty, reset the filtered profiles
    if (e.target.value === ""){
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