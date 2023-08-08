import { userAPI } from "../../API/api";

const FOLLOW = 'FOLLOW'; // створюємо новий тип action
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_ISFETCHING = 'TOGGLE_ISFETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'





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
      users: [], // до запиту на сервер в контейнерній конпоненті ми не маємо юзерів взагали
      pageSize: 7, // по дефолту кількість юзерів буде 7
      totalUsersCount: 0,
      currentPage: 1, // по дефолту при заватнаженні ми будемо знаходитись на 1 сторінці з користувачами
      isFetching: true,
      followingInProgress: [],
      portionSize: 15

    };

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
      case FOLLOW: // якщо actiontype follow - повертаємо копію стейту без оголошення 
      return {
        ...state, // і перезатираємо users на 1 user
        users: state.users.map(u => {
          // пробігаємо по масиву юзерів
          if (u.id === action.userID) {
            // якщо id співпадає
            return { ...u, followed: true }; // повертаємо копію юзера і перезатираємо followed на true
          }

          return u;
        })      
      
      };


      case UNFOLLOW:
        return {
          ...state, // і перезатираємо users на 1 user
          users: state.users.map((u) => {
            // пробігаємо по масиву юзерів
            if (u.id === action.userID) {
              // якщо id співпадає
              return { ...u, followed: false }; // повертаємо копію юзера і перезатираємо followed на false
            }

            return u;
          }),
        };

        case SET_USERS: { // коли з сервера прийдуть користувачі, ми зробимо копію обєкта де візьмемо старий стейт, 
          // а юзерів які там були (раніше пустий масив) перезапишемо новими з які прийдеть в action
          // return {...state, users: [ ...state.users, ...action.users ]}
          return {...state, users: action.users}
        }

        case SET_CURRENT_PAGE: { // коли з сервера прийдуть користувачі, ми зробимо копію де візьмемо старий стейт, юзерів які там були і склеємо з новими з action
          // return {...state, users: [ ...state.users, ...action.users ]}
          return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: { // коли з сервера прийдуть користувачі, ми зробимо копію де візьмемо старий стейт, юзерів які там були і склеємо з новими з action
          // return {...state, users: [ ...state.users, ...action.users ]}
          return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_ISFETCHING: {  // коли прийде значення - ми будемо міняти тру або фолс
          return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {  // коли прийде значення - ми будемо міняти тру або фолс
          return {...state, 
            followingInProgress: action.isFetching 
            ? [...state.followingInProgress, action.userID] 
            : state.followingInProgress.filter(id => id !== action.userID)
          }
        }
      


      default: return state;
    }


};

export const follow = (userID) => ({type: FOLLOW, userID}); // чиста ф-я яка створює і повертає обєкт action з певним типом
export const unfollow = (userID) => ({type: UNFOLLOW, userID}); // 
export const setUsers = (users) => ({type: SET_USERS, users}); // візьмемо юзерів з сервера і засетаємо в стейт
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage}); // візьмемо юзерів з сервера і засетаємо в стейт
export const setTotalUsersCount = (totaUserslCount) => ({type: SET_TOTAL_USERS_COUNT, count: totaUserslCount}); // візьмемо юзерів з сервера і засетаємо в стейт
export const toggleIsFetching = (value) => ({type: TOGGLE_ISFETCHING, isFetching: value}); // візьмемо юзерів з сервера і засетаємо в стейт
export const toggleFollowingProgress = (isFetching, userID) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID}); // візьмемо юзерів з сервера і засетаємо в стейт




export const getUsersthunkCreator =  (page, pageSize) => {

  return (dispatch) => {

    dispatch(toggleIsFetching(true));


    userAPI.getUsers(page, pageSize).then((data) => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
      });

  }

}


export const followthunkCreator =  (userID) => {

  return (dispatch) => {

    dispatch(toggleFollowingProgress(true, userID)) 
    userAPI.follow(userID)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(follow(userID));
      }
      dispatch(toggleFollowingProgress(false, userID))
    });

}

}


export const unfollowthunkCreator =  (userID) => {

  return (dispatch) => {

    dispatch(toggleFollowingProgress(true, userID)) 
    userAPI.unfollow(userID)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollow(userID));
      }
      dispatch(toggleFollowingProgress(false, userID))
    });

}

}

export default usersReducer;




