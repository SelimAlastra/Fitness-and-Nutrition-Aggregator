  import React,{useEffect} from 'react';
  import './styles.css';
  import { useSelector } from 'react-redux';
  import { updatePost } from '../../actions/posts';

var filteredPosts=[];
const SearchBar = ({updatePosts,setUpdatedPosts}) => {
  filteredPosts= useSelector((state) => state.posts);
/* const loadCharacters = async () => {
    try {
         posts = await api.fetchPosts();
    } catch (error) {
        console.error(error);
    }
}; */

//loadCharacters();
const findTag =(array,searchString)=>{
  for(var i=0; i<array.length;i++)
  {
      if(array[i].trim().toLowerCase()===searchString)
       return true
  } 
  return false
}

const keyup = (e) => {
    const searchString = e.target.value.toLowerCase();
     
    filteredPosts=filteredPosts.filter((post) => 
            post.title.toLowerCase().includes(searchString) ||
            post.message.toLowerCase().includes(searchString) ||
            findTag(post.tags,searchString)
            );
      setUpdatedPosts(filteredPosts);
};

    return (
      <div id="searchWrapper">
        <input type="text" name="searchBar" id="searchBar" placeholder="search for a character" onKeyUp={(e)=>keyup(e)}/>
      </div>
      );
  };
  export {filteredPosts} ;
  export default SearchBar;

