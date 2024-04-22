import { NavLink, Outlet } from "react-router-dom";

const SharedLayout = (): JSX.Element => {
    return (
        <div>
            <header>
                <NavLink to="/">LOGO</NavLink>
                <nav>
                    <ul>
                        <li><NavLink to="/"> My list</NavLink></li>
                        <li><NavLink to="/add_game">Add game</NavLink></li>
                        <li><NavLink to="/favourites">Favourites</NavLink></li>
                        <li><NavLink to="/players">Players</NavLink></li>
                        <li><NavLink to="/settings">Settings</NavLink></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )

}

export default SharedLayout;

