import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class Header extends Component {

  constructor(props){
    super(props);
  }

	render() {
		return (
			<div>
				<Navbar dark color="primary" expand="md">
          <div className="container">
            <NavbarBrand className="mr-auto" href="/">
              Instagram
            </NavbarBrand>
          </div>
        </Navbar>
			</div>
		);
	}
}

export default Header;