
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css'






const Message = (props) => {
  return <div>
    <NavLink to='/users' className={s.message}>{props.messageFromDialog}</NavLink>
  </div>
}


export default Message