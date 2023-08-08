

import MypostsContainer from './Myposts/MypostsContainer';
import Profileinfo from './Profileinfo/Profileinfo';



const Profile = (props) => {



  
  return (
    <div>
      <Profileinfo profile={props.profile}
      updateStatus={props.updateStatus}
      status={props.status}
      />
      <MypostsContainer 
      store={props.store}
      />
    </div>
  );
}

export default Profile;
