
import { stopSubmit } from "redux-form";
import { authAPI } from "../../API/api";

const SET_USER_DATA = 'samurai/auth/SET_USER_DATA '


 



// let initialState = { // використовуємо наші старі дані щоб прокрутити перший раз при ініціалізації

    
//     users: [
//       { id: 0, photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5K-OfGEfPT08Nk-71FZa4wPOp4W3BD1cGkw&usqp=CAU',
//          followed: false, name: "Vitalii", status: 'i am a Boss', location: {city: 'Lviv', country: 'Ukraine'} },
//       { id: 1, photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5K-OfGEfPT08Nk-71FZa4wPOp4W3BD1cGkw&usqp=CAU',
//         followed: true, name: "Denys", status: 'friend', location: {city: 'Kyiv', country: 'Ukraine'} },
//       { id: 2, photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5K-OfGEfPT08Nk-71FZa4wPOp4W3BD1cGkw&usqp=CAU',
//         followed: false, name: "Sofia", status: 'sister', location: {city: 'Krakiv', country: 'Poland'} },
//     ],
//   }


    let initialState = {
      userID: null,
      email: null,
      login: null,
      
    
 

    };

const authReducer = (state = initialState, action) => {

    switch (action.type) {
      case SET_USER_DATA:
        return {
          ...state,
          ...action.payload, // деструкрутизуємо що нам прийде з актіона
          isAuth: true
        };

      default:
        return state;
    }


};


export const setAuthData = (userID, email, login, isAuth) => ({type: SET_USER_DATA, payload: 
  {userID, email, login, isAuth}});


export const authThunk = () => async (dispatch) => {
 
    let response = await authAPI.me() 
  
      if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthData(id, email, login, true))
      } 
    ;
  
}

export const login = (email, password, rememberMe) => (dispatch) => {


    authAPI.login(email, password, rememberMe) 
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(authThunk()) 
      } else {
        
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some text'
        dispatch(stopSubmit('login', {_error: message}))
      }
      
    });
  
}
export const logoutthunk = () => (dispatch) =>  {

    authAPI.logout() 
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthData(null, null, null, false))
      }
     
    });
  
}


export default authReducer;


