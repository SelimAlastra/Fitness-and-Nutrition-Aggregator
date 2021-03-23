import React from 'react';
import './Navbar.css';
import { fade } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { useSelector } from 'react-redux';

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

/**
 * 
 */
const SearchBox = ({updatePosts,setUpdatedPosts}) => {
  const classes = useStyles();
  filteredPosts = useSelector((state) => state.posts);

  const findTag =(array,searchString)=>{
    for(var i=0; i<array.length;i++){
      if(array[i].trim().toLowerCase()===searchString){
        return true
      }
    }
    return false
  }

  const handleOnInputChange = (e) => {
    const searchString = e.target.value.toLowerCase();
     
    filteredPosts=filteredPosts.filter((post) => 
            post.title.toLowerCase().includes(searchString) ||
            post.message.toLowerCase().includes(searchString) ||
            findTag(post.tags,searchString)
            );
    setUpdatedPosts(filteredPosts);
  };

  return (
    <div className="searchbox-container">
      <label className="search-label" htmlFor="search-input">
        <InputBase
            type="text" 
            name="query"
            id="search-input"
            placeholder="Search…" 
            onKeyUp={(e)=>handleOnInputChange(e)}
            classes={{root: classes.inputRoot, input: classes.inputInput}}
            inputProps={{ 'aria-label': 'search' }}
          />
      </label>
    </div>
    );
};

export {filteredPosts} ;
export default SearchBox;