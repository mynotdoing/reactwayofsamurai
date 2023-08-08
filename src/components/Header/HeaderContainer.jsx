
import Header from "./Header"
import React from "react";
import { connect } from "react-redux";
import { authThunk, logoutthunk } from "../Redux/auth-reducer";





class HeaderContainer extends React.Component {

  
  

  componentDidMount() {
    
  //   // ця санка робить get запит на сервер і якщо успішно(resultCode === 0) створює через 
  // деструктуризацію змінні з даними і сетає
  //   // їх через редюсер в стейт за домопомого setAuthData. 
  //   // Ці дані вже живуть в стейті і isAuth міняється на true
  //   // Потім такі дані як логін ми передаємо нашій презентаційній і вона покаже логін якщо isAuth = true 

    this.props.authThunk()

    

  //   // authAPI.me() 
  //   //   .then(response => {
  //   //     if (response.data.resultCode === 0) {
  //   //       let {id, login, email} = response.data.data;
  //   //       this.props.setAuthData(id, email, login)
  //   //     }
  //   //   });
  }
  
  
  

  render() {
    
    return <Header {...this.props}/>
  }
}


let mapStateToProps = (state) => { 
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
}
}

export default connect(mapStateToProps, {authThunk, logoutthunk})(HeaderContainer);