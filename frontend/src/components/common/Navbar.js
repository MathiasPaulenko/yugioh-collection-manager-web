import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'


export const Navbar = () => {

    const logo = `/logo512.png`;

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3">
            <img width="35" height="30" className="d-inline-block align-top m-1" src={logo} alt="Logo"></img>

            <Link
                className="navbar-brand"
                to="/"
            >
                YuGiOh! Collection

            </Link>

            <div className="collapse navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                        to="/dashboard"
                    >
                        Dashboard

                    </NavLink>

                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                        to="/collections"
                    >
                        Collection

                    </NavLink>


                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                        to="/filters"
                    >
                        Filters

                    </NavLink>


                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')}
                        to="/add"
                    >
                        Add

                    </NavLink>

                    <NavDropdown title="Cards" menuVariant="dark">
                        <NavDropdown.Item href="/repeated">Repeated</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/banlist">Banlist</NavDropdown.Item>
                        <NavDropdown.Item href="/staples">Staples Cards</NavDropdown.Item>
                        <NavDropdown.Item href="/archetypes_list">Archetypes List</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/search_card">Search Card</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="CardSet" menuVariant="dark">
                        <NavDropdown.Item href="/cardset">Cardset Collection</NavDropdown.Item>
                        <NavDropdown.Item href="/prices">Card Prices</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/cardsetlist">
                            Cardset List
                        </NavDropdown.Item>
                    </NavDropdown>




                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='text-white'>Mathias Paulenko Echeverz</span>

                </ul>
            </div>
        </nav>
    )
}