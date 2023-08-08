import React from 'react';
import Profile from './Profile'
import { connect } from 'react-redux';
import { setUserProfile , getProfileThunk, getStatus, updateStatus} from '../Redux/profile-reducer';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { withAuthRedirectComponent } from '../HOC/withAuthRedirect';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
          <Component
              {...props}
              router={{ location, navigate, params }}
          />
      );
  }

  return ComponentWithRouterProp;
}


class ProfileContainerSecond extends React.Component {

  

  componentDidMount() {
    let userId = this.props.router.params['*']; // тут у нас буде сидіти useriD який прийде з <NavLink to={"/profile/" + u.id}> 
    // в компоненті Users (ми там клікаємо по аватарці) і потім робиться вже запит на того чувака сетається його в стейт
    //  і потім через пропси все відображається в презентаційній компоненті. Якщо нема такого шляху тоді по дефолту 27157 
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    
 

    this.props.getStatus(userId)
    this.props.getProfileThunk(userId)
    // userAPI.getProfile(userId)
    //     .then((response) => {
    //       this.props.setUserProfile(response.data);
    //     });
  }
// просто робимо get запит на апі і дістаємо користувача номер 2(захардкоженого), 
//далі його дані передаємо в стейт через колбек setUserProfile        


  render() {
    
    return (
      <Profile  profile={this.props.profile}
      status={this.props.status}
      updateStatus={this.props.updateStatus}
      />
    );
  }
}
// передаємо нашого отриманого користувача остаточній презентаційній компоненті


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  authorizedUserId: state.auth.userID 
});

let AuthRedirectComponent = withAuthRedirectComponent(ProfileContainerSecond)


let withRouterComponent = withRouter(AuthRedirectComponent)
// withRouter це ф-я яка повертає передану компоненту + дані з url
// значенням даної змінної(компоненти) буде наша звичайна компонента + дані з withRouta, вони будуть сидіти в this.props
// нашу класову компоненту обернули Wiyhrouter щоб вона володіла даними з url 

const ProfileMainContainer = connect(mapStateToProps, {setUserProfile, getProfileThunk, getStatus, updateStatus}) (withRouterComponent);


// і тепер цю огорнуту даними з url компоненту огортаємо ще даними з стора, тепер в ніх буде дофіга пропсів які вона передасть далі

// ProfileMainContainer це головний контейнер який створюєтья над класовим ProfileContainerSecond і який служить для 
// отримання даних mapStateToProps і mapDispatchToProps зі стора через Provider. Далі через коннект ми їх передаємо другому 
// контейнеру ProfileContainerSecond (вони там будуть сидіти в this.props), 
// який сам є API-контейнером перед презантаційною компонентою Profile для якої він робить брудну роботу по запитах і передає
// їй далі дані через this.props



export default ProfileMainContainer // його ми експортуємо в App.js, де далі з ним будуть відображати через роутер