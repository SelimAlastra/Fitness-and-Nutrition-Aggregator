  import React from 'react';
  import './styles.css';
  import { useSelector } from 'react-redux';

var filteredPosts;
const SearchBar = () => {
  filteredPosts = useSelector((state) => state.posts);

/* const loadCharacters = async () => {
    try {
         posts = await api.fetchPosts();
    } catch (error) {
        console.error(error);
    }
}; */

//loadCharacters();

const keyup= (e) => {
    const searchString = e.target.value.toLowerCase();
     
    filteredPosts=filteredPosts.filter((post) => 
            post.title.toLowerCase().includes(searchString) ||
            post.message.toLowerCase().includes(searchString)
            );
};

    return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Document</title>
          <link rel="stylesheet" />
            <div id="searchWrapper">
              <input type="text" name="searchBar" id="searchBar" placeholder="search for a character" onKeyUp={(e)=>keyup(e)}/>
            </div>
            <ul id="charactersList" />
        </div>
      );
  };
  export {filteredPosts} ;
  export default SearchBar;

