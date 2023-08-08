
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css'




const Dialogitem = (props) => {


  let path = `'/dialogs/' + props.key`
  return (
    <div className={s.dialog}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}



export default Dialogitem