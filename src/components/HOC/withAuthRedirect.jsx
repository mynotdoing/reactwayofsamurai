// Тут я створив ХОК - це ф-я або клас, який приймає параметром якийсь компонент, додає до нього якусь логіку або перевірку
// і повертає цей компонент вже з тою логікою
// Для того щоб не прокидувати кожній потрібній компоненті в коді наші дані зі стейта, ми закидуємо їх сюди через mapStateToProps
// Тепер коннектимо нашу огорнуту логікою компоненту з mapStateToProps
// Ми цей ХОК ексопртуємо і потім імпортуємо в бажаний контейнер і там його викликаємо обертаючи наш контонент для якого треба додати логіку 



import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';


let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth 
})

export const withAuthRedirectComponent = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Navigate to={"/login"} />;
      return <Component {...this.props} />;
    }
  }
  let connectedWithMapStateRedirectComponent = connect(mapStateToProps)(RedirectComponent)
  return connectedWithMapStateRedirectComponent;

}