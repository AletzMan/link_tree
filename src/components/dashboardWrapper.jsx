import { NavLink } from "react-router-dom";
import './componentStyle.css';
import logoAG from '../assets/logo-small.svg'

function DashboardWrapper({ children, avtiveLinks }) {
    return (
        <header className="header">
            <nav className="header__nav nav">
                <img className="nav__logo" src={logoAG} alt="logo" />
                <NavLink className={`nav__link nav__link--${avtiveLinks[0]}`} to={'/dashboard'}>Links</NavLink>
                <NavLink className={`nav__link nav__link--${avtiveLinks[1]}`}  to={'/dashboard/profile'}>Profile</NavLink>
                <NavLink className={`nav__link nav__link--${avtiveLinks[2]}`}  to={'/signout'}>SignOut</NavLink>
            </nav>
            {children}
        </header>
    );
}

export { DashboardWrapper };