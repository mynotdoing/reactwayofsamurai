import { profileAPI } from "../../API/api";

const ADD_POST = 'ADD-POST'; // створюємо новий тип action

const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"


// первоначально наш редакс не має даний тому ми оголошуємо initialState. Одноразовий обєкт з стартовими даними
// Далі вже коли діспатччимо нові action стейт буде завжди сюди приходити і ми будемо використовувати приходящий стейт
// коли ми щось пушимо в старий стейт по факту він ж не міняє наш написаний код, а просто є змінений
// ми наші дані перенесли зі старого стору і тепер вони завжди тут і будуть перемальовуватись при потребі


let initialState = { // використовуємо наші старі дані щоб прокрутити перший раз при ініціалізації. 
    postsData: [
      { id: 0, message: "Bla", count: 23 },
      { id: 1, message: "Bla bla  ", count: 13 },
      { id: 2, message: "Bla bla bla ", count: 14 },
      { id: 3, message: "Bla blaasd bla ", count: 14 },
    ],

    profile: null,
    status: ''
  }

// react автоматично діспатчить на самому початку, але він не дістає щодного арнумента стейт, тому ми робимо initialState


const profileReducer = (state = initialState, action) => { // приймає (створює змінні) стейт зверху і обєкт action який приходить через діспатч

    switch (action.type) {
      case ADD_POST: {
        let newPost = {
          // створення нового обєкту
          id: 5,
          message: action.newPostText,
          count: 0,
        };

        let stateCopy = {...state};
        stateCopy.postsData = [...state.postsData]


        stateCopy.postsData.push(newPost); // додавання до нової копії масиву
        stateCopy.newPostText = ""; // очистка поля
        return stateCopy;
      };
      case SET_USER_PROFILE: {
        let stateCopy = {...state}
        stateCopy.profile = action.profile
        return stateCopy
       
      };
      case SET_STATUS: {
        let stateCopy = {...state}
        stateCopy.status = action.status
        return stateCopy
       
      };
      case DELETE_POST: {
        return {...state, postsData: state.postsData.filter(p => p.id !== action.postID)}
      };

        default: return state; // якщо щось інше то стейт не міняється
    }


};




export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({type: SET_STATUS, status })
export const addPostClickActionCreator = (newPostText) => ({type: ADD_POST, newPostText}); //

export const deletePost = (postID) => ({type: DELETE_POST, postID})


export const getProfileThunk = (userId) => { // санка при виклику прийме аргументом id користувача і зробить запит getProfile з ним в аргументі
  // і потім викличе діспатч нашого actioncreatora setUserProfile. Він змінить стейт і презентаційна компонента через пропси перемалюється  
  return (dispatch) => {
    profileAPI.getProfile(userId)
    .then((response) => {
      dispatch(setUserProfile(response.data));
    });
  }
}

export const getStatus = (userId) => { // санка при виклику прийме аргументом id користувача і зробить запит getProfile з ним в аргументі
  // і потім викличе діспатч нашого actioncreatora setUserProfile. Він змінить стейт і презентаційна компонента через пропси перемалюється  
  return (dispatch) => {
    profileAPI.getStatus(userId)
    .then((response) => {
      dispatch(setStatus(response.data));
      
    });
  }
}
export const updateStatus = (status) => { // санка при виклику прийме аргументом id користувача і зробить запит getProfile з ним в аргументі
  // і потім викличе діспатч нашого actioncreatora setUserProfile. Він змінить стейт і презентаційна компонента через пропси перемалюється  
  return (dispatch) => {
    profileAPI.updateStatus(status)
    .then((response) => {
      if(response.data.resultCode === 0) {
        dispatch(setStatus(status));

      }
    });
  }
}




export default profileReducer;