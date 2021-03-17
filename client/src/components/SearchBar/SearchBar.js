  import React from 'react';
  import './styles.css';
  import * as api from '../api/index';
  import { useSelector } from 'react-redux';


const SearchBar = () => {

const searchBar = document.getElementById('searchBar');

let filteredPosts = useSelector((state) => state.posts);


/* const loadCharacters = async () => {
    try {
         posts = await api.fetchPosts();
    } catch (error) {
        console.error(error);
    }
}; */

//loadCharacters();

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    filteredPosts = filteredPosts.filter((post) => {
        return (
            post.title.toLowerCase().includes(searchString) ||
            post.message.toLowerCase().includes(searchString)
        );
    });
});




    return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Document</title>
          <link rel="stylesheet" />
            <div id="searchWrapper">
              <input type="text" name="searchBar" id="searchBar" placeholder="search for a character" />
            </div>
            <ul id="charactersList" />
        </div>
      );
  };

  export default SearchBar;


