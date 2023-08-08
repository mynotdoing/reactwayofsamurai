
import Preloader from '../../common/Prealoder/Preloader';
import s from './Profileinfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks'




const Profileinfo = (props) => {


  if (!props.profile) {
    return <Preloader/>
  }

  return (
    <div className={s.contentGolovnuy}>
      {/* <div>
        <img alt='pic' src="https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws=" />
        </div> */}
      <img
        alt="user"
        className={s.userProfilePhoto}
        src={props.profile.photos.large}
      />
      <div className={s.descriptionBlock}> {props.profile.aboutMe} </div>
      <div className={s.descriptionBlock}>
        {" "}
        {props.profile.contacts.instagram}{" "}
      <ProfileStatusWithHooks status={props.status}
      updateStatus={props.updateStatus}
      />
      </div>
    </div>
  );  
}

export default Profileinfo;
