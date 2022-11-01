import React from 'react';
import { NavLink } from 'react-router-dom';
const Menu = () =>{
   return(
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div className="position-sticky pt-3 sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to={'/users'}>
            <span data-feather="home" className="align-text-bottom"></span>
            User
          </NavLink >
          <NavLink className="nav-link active" aria-current="page" to={'/products'}>
            <span data-feather="home" className="align-text-bottom"></span>
            Product
          </NavLink >
        </li>
      </ul>
    </div>
  </nav>
   );
};
export default Menu; 