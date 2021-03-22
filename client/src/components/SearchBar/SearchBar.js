  import React,{useEffect} from 'react';
  import './styles.css';
  import { useSelector } from 'react-redux';
  import { updatePost } from '../../actions/posts';
  import {associatedTags} from '../../quiz/quizUser';

var filteredPosts=[];
var newArray=[];
const initialFilteredPosts = new Set();
const SearchBar = ({updatePosts,setUpdatedPosts}) => {
  filteredPosts= useSelector((state) => state.posts);
/* const loadCharacters = async () => {
    try {
         posts = await api.fetchPosts();
    } catch (error) {
        console.error(error);
    }
}; */
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
       newFilteredPosts=filteredPosts.filter((post) => 
            post.title.toLowerCase().includes(searchString) ||
            post.message.toLowerCase().includes(searchString) ||
            findTag(post.tags,searchString)
            );
      newFilteredPosts.forEach(post=> initialFilteredPosts.add(post));

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
    const searchString = e.target.value.toLowerCase();
    initialFilteredPosts.clear();
   filterPosts(searchString);
   var newArray=[];
   initialFilteredPosts.forEach(v => newArray.push(v));
      setUpdatedPosts(newArray);
    
};

    return (
      <div id="searchWrapper">
        <input type="text" name="searchBar" id="searchBar" placeholder="search for a character" onKeyUp={(e)=>keyup(e)}/>
      </div>
      );
  };
  export {filteredPosts, newArray} ;
  export default SearchBar;

