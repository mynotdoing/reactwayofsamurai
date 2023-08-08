import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'

const Navbar = (props) => {



  return (
    <nav className={s.navZboky}>
      <ul>
        <li className={s.item}>
          <NavLink to='/profile' className = { navData => navData.isActive ? s.activeLink : s.nonactiveLink }>Profile</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to='/dialogs' className = { navData => navData.isActive ? s.activeLink : s.nonactiveLink } >Messages</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to='/users' className = { navData => navData.isActive ? s.activeLink : s.nonactiveLink } >Users</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to='/setting' className = { navData => navData.isActive ? s.activeLink : s.nonactiveLink } >Settings</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to='/login' className = { navData => navData.isActive ? s.activeLink : s.nonactiveLink } >Login</NavLink>
        </li>

      </ul>
    </nav>
  );
}



export default Navbar;
