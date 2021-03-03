import iphone from './images/iphoneXR.png';
import './App.css';
import {Navbar,Nav,NavDropdown,Card,Button,Badge} from 'react-bootstrap'
import React from 'react';
import { connect } from 'react-redux';
import PreviewOrders from './orders/preview-orders';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  getOrderMenuItems() {
    return (
      <div className="card d-none d-lg-block d-md-block " style={{width:'12rem'}}>
              <div className="row no-gutters">
                  <div className="col-sm-5 col-md-6 col-lg-5" >
                      <img src={iphone} className="img-fluid" />
                  </div>
                  <div className="col-sm-7 col-md-6 col-lg-7">
                      <div className="card-block px-2">
                          <i className="fa fa-home"></i>
                          <div  className="menu-items">
                              <span className="line"></span>
                              <span className="line"></span>
                              <span className="line"></span>
                          </div>
                          <div >
                            <div className="main-font-size"><b>Apple Iphone XR</b></div>
                            <div className="side-font">Yellow</div>
                            <div  className="side-font">64GB</div>
                            <div  className="side-font">Qty:1</div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
    )
  }
  render() {
    return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" sticky="true">
        <Navbar.Brand href="#home">
          Dice Roller
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <NavDropdown title="Products" id="collasible-nav-dropdown">
            </NavDropdown>
            <NavDropdown title="Brands" id="collasible-nav-dropdown">
            </NavDropdown>
            <NavDropdown title="Deals" id="collasible-nav-dropdown">
            </NavDropdown>
            <NavDropdown title="Services" id="collasible-nav-dropdown">
            </NavDropdown>
          </Nav>
          <Nav>
          <NavDropdown title="Account" id="collasible-nav-dropdown">
            </NavDropdown>
            <NavDropdown title="Recently Viewed" id="collasible-nav-dropdown">
            </NavDropdown>
            <NavDropdown title="Order Status" id="collasible-nav-dropdown">
              <PreviewOrders />
            </NavDropdown>
            <NavDropdown title="Saved Items" id="collasible-nav-dropdown">
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    count: state.app.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default App;
