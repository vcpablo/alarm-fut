import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar as Nav, NavDropdown } from 'react-bootstrap'

const Navbar = ({ history }) => {
  console.log(history)
  const logout = () => {
    localStorage.clear()
    history.push('/login')
  }

  const teams = () => history.push('/teams')
  return (
    <Nav expand="lg" bg="primary">
      <Nav.Brand href="#home" className="text-white">
        Alarm Fut
      </Nav.Brand>
      <Nav.Toggle aria-controls="basic-navbar-nav" />
      <Nav.Collapse id="basic-navbar-nav">
        <NavLink className="nav-link" activeClassName="active" exact to="/">
          Home
        </NavLink>
      </Nav.Collapse>
      <Nav.Collapse id="basic-navbar-nav2" className="justify-content-end">
        <NavDropdown title="My Account" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={teams}>Teams</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav.Collapse>
    </Nav>
  )
}

export default Navbar
