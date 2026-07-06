import React, { useState } from 'react'
import { NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {

    const logo = `/logo512.png`;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm px-3 px-lg-4">
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={close}>
                <img width="32" height="28" className="d-inline-block align-top" src={logo} alt="Logo" />
                <span className="fw-bold">YuGiOh! Collection</span>
            </Link>

            <button
                className="navbar-toggler border-0"
                type="button"
                onClick={toggle}
                aria-label="Toggle navigation"
            >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                <div className="navbar-nav me-auto">
                    <NavLink className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')} to="/dashboard" onClick={close}>
                        Dashboard
                    </NavLink>

                    <NavLink className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')} to="/collections" onClick={close}>
                        Collection
                    </NavLink>

                    <NavLink className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')} to="/filters" onClick={close}>
                        Filters
                    </NavLink>

                    <NavLink className={({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '')} to="/add" onClick={close}>
                        Add
                    </NavLink>

                    <NavDropdown title="Cards" menuVariant="dark" onClick={close}>
                        <NavDropdown.Item href="/repeated">Repeated</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/banlist">Banlist</NavDropdown.Item>
                        <NavDropdown.Item href="/staples">Staples Cards</NavDropdown.Item>
                        <NavDropdown.Item href="/archetypes_list">Archetypes List</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/search_card">Search Card</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="CardSet" menuVariant="dark" onClick={close}>
                        <NavDropdown.Item href="/cardset">Cardset Collection</NavDropdown.Item>
                        <NavDropdown.Item href="/prices">Card Prices</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/cardsetlist">Cardset List</NavDropdown.Item>
                    </NavDropdown>
                </div>

                <ul className="navbar-nav ms-auto">
                    <span className='text-white-50 small'>Mathias Paulenko Echeverz</span>
                </ul>
            </div>
        </nav>
    )
}