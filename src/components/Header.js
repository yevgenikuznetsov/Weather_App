import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
          <nav>
            <Link to="/">Main</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>
        </header>
      );
}

export default Header;