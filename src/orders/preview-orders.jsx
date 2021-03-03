import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './preview-orders.css';
import iphone from '../images/iphoneXR.png';
import { setCurrentOrderId, setOrders } from '../actions';
const axios = require('axios');
class PreviewOrdersComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getOrderDetails = this.getOrderDetails.bind(this);
    }

    componentDidMount()
    {
        axios.get('http://localhost:8081/customer/1/orders/limit/2')
            .then((response) => {
                this.props.setOrders(response.data)
            }, this.props)
    }
    getOrderDetails(id) {
        this.props.setCurrentOrderId(id);
    }
    render() {
        return (
            <div>{
            this.props.orders && this.props.orders.map((order, index) => {
            return (
            <Link to={`/order/${order.orderId}`} key={index}>
            <div>
            <div className="card d-none d-md-block d-lg-block "  key={index}  onClick={() =>this.getOrderDetails(order.orderId)}>
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
                          {order.items.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <p className="main-font-size">{item.name}</p>
                                        {/* <p className="side-font">Color: {item.skuAttributes.color}</p>
                                        <p className="card-text">Size: {item.skuAttributes.size}</p> */}
                                        <p className="side-font">Quantity: {item.quantity}</p>
                                    </div>
                                )
                                })
                            }
                      </div>
                  </div>
              </div>
            </div>
            </div>
           <div>
            <div className=" card d-md-none d-lg-none d-sm-block   " key={index}  onClick={() =>this.getOrderDetails(order.orderId)}>
              <div className="row no-gutters">
                  <div className="col-sm-2 col-md-6 col-lg-5" >
                      <img src={iphone} className="img-fluid" />
                  </div>
                  <div className="col-sm-10 col-md-6 col-lg-7">
                      <div className="card-block px-2">
                        
                          <div  className="menu-items">
                          <div className="row order-detail-not-shipped" >
                    <div className="status-tracker">
                        <div>
                            <i className="fa fa-shopping-cart fa-lg  center"></i>
                        </div>
                        <div className="line"></div>
                        <div >
                            Ordered
                        </div>
                    </div>

                    <div className="status-tracker" >
                        <div>
                            <i className="fa fa-truck  fa-lg center "></i>
                        </div>
                        <div className="line"></div>
                        <div >
                            Shipped
                    </div>
                    </div>
                    <div className="status-tracker">
                        <div>
                            <i className="fa fa-home fa-lg center "></i>
                        </div>
                        <div className="line"></div>
                        <div >
                            Delivered
                        </div>
                    </div>
                </div>
                          </div>
                          {order.items.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <p className="main-font-size">{item.name}</p>
                                        {/* <p className="side-font">Color: {item.skuAttributes.color}</p>
                                        <p className="card-text">Size: {item.skuAttributes.size}</p> */}
                                        <p className="side-font">Quantity: {item.quantity}</p>
                                    </div>
                                )
                                })
                            }
                      </div>
                  </div>
              </div>
            </div>
            </div>
            </Link>
                )
            })}
            </div>
        )
    
    }
}

const mapStateToProps = (state) => {
    return {
      count: state.app.count,
      orders: state.app.orders
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setOrders: (orders) => {
            dispatch(setOrders(orders));
        },
        setCurrentOrderId: (id) => {
            dispatch(setCurrentOrderId(id))
        }
    }
  }
  
  export const PreviewOrders = connect(mapStateToProps, mapDispatchToProps)(PreviewOrdersComponent);
  export default PreviewOrders;
  