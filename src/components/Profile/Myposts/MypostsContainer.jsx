
import { connect } from 'react-redux';

import { addPostClickActionCreator } from '../../Redux/profile-reducer';
import Myposts from './Myposts';

// буде тільки постачати нашу компоненту MyPost даними, може бути не чистоб

// const MypostsContainer = (props) => {



//   let state = props.store.getState();


//   let addPost = () => {

//     props.store.dispatch( addPostClickActionCreator());

//   };

//   let onPostChange = (text) => {
//     let action = onPostChangeActionCreator(text)
//     props.store.dispatch(action)
//   };




// 3) відправляємо text через передану нам через пропси ф-ю dispatch цей текст в змінну newPostText, 
// 4) вона відразу ж стає значенням value яке ми фіксуємо в полі вводу через value={props.newPostText} нижче в атрибуті textarea



//   return (
//     <Myposts 
//     updateNewPostText={ onPostChange } 
//     addPost={addPost}
//     postsData={state.profilePage.postsData}
//     newPostText={state.profilePage.newPostText}
//     />
//   );
// }



let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}


let mapDispatchToProps = (dispatch) => {
  return {

    addPost: (newPostText) => {
    dispatch( addPostClickActionCreator(newPostText));
    }
  }
}


const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts)



export default MypostsContainer;


// значення в полі буде строго передано пропсами
