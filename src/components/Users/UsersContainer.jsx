
import React from "react";
import { connect } from "react-redux";
import { follow} from "../Redux/users-reducer";
import Users from './Users'
import { unfollow, followthunkCreator, unfollowthunkCreator } from "../Redux/users-reducer";
import { setCurrentPage} from "../Redux/users-reducer";
import Preloader from "../common/Prealoder/Preloader";
import { toggleFollowingProgress } from "../Redux/users-reducer";
import { getUsersthunkCreator } from "../Redux/users-reducer";
import { getPageSize, getUsers, getTotalUsersCount } from "../Redux/userSelesctors";

class UsersAPIComponent extends React.Component { // компонента коли монтується їй потрібні дані про користувачів щоб запхати в стейт в редюсері
  // тому в componentDidMount ми викликаємо санку this.props.getUsersthunkCreator(this.props.currentPage, this.props.pageSize), яка 
  // нам звісно ж приходить як this.props з ф-ї connect. 
    componentDidMount() {

      this.props.getUsersthunkCreator(this.props.currentPage, this.props.pageSize ) // аргументи захардкоджені в стейті редюсера
      // Ми викликаємо даний колбек-санку для того щоб:
      // 1) спочатку запуститься колбек крутілки (isfetching зробить true). Це перший колбек-діспатч dispatch(toggleIsFetching(true))
      // всередині санки.
      // Потім робиться запит на сервер всередині санки і якщо є успішний response далі викличе ряд колбеків-діспатчів: 
      // 2) перестане працювати крутілка (в редусері в стейт isfetching передасться false) через діспатч dispatch(toggleIsFetching(false));;
      // 3) потім через колбек setUsers ми заповнимо наш дефолтний пустий масив users тою кількість з response яка прийде  
      // 4) далі засетаємо в стейт редюсера значення загальної кількості юзерів які прйшли в response dispatch(setTotalUsersCount(data.totalCount) 
      // ! Ці всі засетані дані оновлять наш стейт і будуть в ньому сидіти => тепер ми їх передамо через пропси в презентаційну компоненту нижче:

      // totalUsersCount={this.props.totalUsersCount} + users={this.props.users} (дивитись нижче)
      

    }
  
    onPageChange = (pageNumber) => { // створюємо цю ф-ю і передаємо її нижче нашій презентаційній компоненті, 
      //щоб в подальшому (не при монтуванні) а при кліку на номер сторінки ішов 
      //запит на сервер, ми діставали потрібні нам дані і передавали їх в стейт через виклик колбек-діспатч setCurrentPage, 
      //який ми звісно отримали з редюсера через коннект
      
      
      this.props.getUsersthunkCreator(pageNumber, this.props.pageSize )
      this.props.setCurrentPage(pageNumber);
      // this.props.toggleIsFetching(true)
      // userAPI.getUsers(pageNumber, this.props.pageSize)
      //   .then((data) => {
      //     this.props.toggleIsFetching(false)
      //     this.props.setUsers(data.items);
      //   });
    };
  
    render() {
  
  
      return ( <>
      
      {this.props.isFetching ? <Preloader/>  : null}
      
      
      
      <Users
      totalUsersCount={this.props.totalUsersCount}
      pageSize={this.props.pageSize}
      currentPage={this.props.currentPage}
      onPageChange={this.onPageChange}
      users={this.props.users}
      unfollow={this.props.unfollow}
      follow={this.props.follow}
      toggleFollowingProgress = {this.props.toggleFollowingProgress}
      followingInProgress={this.props.followingInProgress}
      followthunkCreator={this.props.followthunkCreator}
      unfollowthunkCreator={this.props.unfollowthunkCreator}
      portionSize={this.props.portionSize}
      
      />
      </> 
      )  
  }
  }
  
  



let mapStateToProps = (state) => {   // це ф-я яка приймає стейт(глобальний) цілком і повертає обєкт тільки з тими даними які нам потрібні
    return {
        users: getUsers(state), // в пропсах які ми передамо буде сидіти властивість users з описаним значенням
        pageSize: getPageSize(state), // ми використали селектори
        totalUsersCount: getTotalUsersCount(state),
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        portionSize: state.usersPage.portionSize
    }
};


// let mapDispatchToProps = (dispatch) => { // реакт за нас огортає в діспатч передані колбеки/актіон-креатери, тому просто передаємо замість mapdispatchtoprops обєкт з колбеками
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) => {
//         dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//         dispatch(setCurrentPageAC(pageNumber))    
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))  
//         },
//         toggleIsFetching: (value) => {
//           dispatch(toggleIsFetchingAC(value))
//         }
// };

// }

const UsersContainer = connect(mapStateToProps, {getUsersthunkCreator,followthunkCreator ,unfollowthunkCreator 
  ,follow, unfollow,  setCurrentPage, 
toggleFollowingProgress})(UsersAPIComponent)

export default UsersContainer;
 