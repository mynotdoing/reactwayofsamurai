
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar';
import {  Route, Routes } from 'react-router-dom';
import DialogsMainContainerComposed from './components/Dialogs/DialogsMainContainer';
// const DialogsMainContainerComposed = React.lazy(() => {import('./components/Dialogs/DialogsMainContainer')})
import UsersContainer from './components/Users/UsersContainer';
// import ProfileMainContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login'
import Footer from './components/Footer';
import React from 'react';
const ProfileMainContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))






const App = (props) => {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="appMainContentPravo">
      <React.Suspense fallback={<div>Завантаження...</div>}>
        <Routes>

          <Route
            path="/profile/*" // path роутера нам потрібний, щоб при кліку десь на navlink зі значенням
            // to={"/profile/" ми попадали сюди. В нашому проекті цей навлінк є повішеним в navbari і на аватарці юзерів в Users
            element={
              <ProfileMainContainer
              // store={props.store}
              />
            }
          />
          <Route path="/dialogs" element={<DialogsMainContainerComposed />} />
          
          <Route path="/users" element={<UsersContainer />} />

          <Route path="/login" element={<Login />} />

        </Routes>
        </React.Suspense>
      </div>
      <Footer/>
    </div>
  );
};







export default App;


// Наш головний компонент, всі роути малюються тут