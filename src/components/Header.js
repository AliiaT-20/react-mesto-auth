import headerLogo from '../images/logotype.svg';
import { Link, useHistory } from 'react-router-dom';

function Header(props) {
    const history = useHistory();
    function signOut(){
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }
    return (
        <header className="header">
            <img src= {headerLogo} alt="Логотип" className="header__logo" />
            <div className="header__block">
                {props.em === '/' && (<p className="header__email">{props.userEmail}</p>)} 
                <Link className="header__link" to={props.to} onClick={signOut}>{props.text}</Link>
            </div>
        </header>
    );
  }
  
  export default Header;
  