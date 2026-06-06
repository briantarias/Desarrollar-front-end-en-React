import { NavLink } from "react-router-dom"

export const NavBar = () => {
  return (
    <div className="w3-bar w3-border w3-light-grey">
        <NavLink to='/' className="w3-bar-item w3-button">Home</NavLink>
        <NavLink to='/jefes' className="w3-bar-item w3-button">Jefes</NavLink>
        <NavLink to='/productos' className="w3-bar-item w3-button">Productos</NavLink>
        <NavLink to='/empleados' className="w3-bar-item w3-button">Empleados</NavLink>
    </div>
  )
}