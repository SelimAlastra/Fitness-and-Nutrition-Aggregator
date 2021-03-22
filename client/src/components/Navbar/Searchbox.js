import React from 'react';
import './Navbar.css';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { useSelector } from 'react-redux';
import { updatePost } from '../../actions/posts';

const styles = theme => ({
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
  });



var filteredPosts=[];
const Searchbox = ({updatePosts,setUpdatedPosts}) => {
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
  export default withStyles(styles)(Searchbox);


// class Searchbox extends React.Component {

//     constructor (props) {
//         super(props);
//         this.state = {
//             query: '',
//             results: {},
//             loading: false,
//             message: '',
//         }
//     }

//     /**
//      * query value updates while typing input
//      */
//     handleOnInputChange = (event) => {
//         const query = event.target.value;
//         this.setState({query: query, loading: true, message: this.state.name});
//         // let filteredPosts = useSelector((state) => state.posts)

//         // const searchString = query.toLowerCase();
     
//         // filteredPosts = filteredPosts.filter((post) => 
//         //     post.title.toLowerCase().includes(searchString) ||
//         //     post.message.toLowerCase().includes(searchString)
//         //     );
//         // this.props.setUpdatedPosts(filteredPosts);
//     };

//     render(){
//         const {query} = this.state;
//         const {classes} = this.props;
//         console.log(this.state);
//         return (
//             <div className="searchbox-container">
//                 <label className="search-label" htmlFor="search-input">
//                     <InputBase
//                         type="text" 
//                         name="query"
//                         value={query}
//                         placeholder="Search…"
//                         id="search-input"
//                         onChange={this.handleOnInputChange}
//                         classes={{
//                             root: classes.inputRoot,
//                             input: classes.inputInput,
//                         }}
//                         inputProps={{ 'aria-label': 'search' }}
//                         />
//                 </label>
//             </div>
//         )
//     }
// }

// export default withStyles(styles)(Searchbox);