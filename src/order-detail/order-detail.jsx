import React from 'react';
import iphone from '../images/iphoneXR.png';
import './order-detail.css';
import { setCurrentOrder } from '../actions.js'
import { connect } from 'react-redux';
import axios from 'axios';

class OrderDetailComponent extends React.Component {
    constructor(props) {
      super(props);
      this.getDetails = this.getDetails.bind(this);
      this.buildOrdersTemplate = this.buildOrdersTemplate.bind(this);
    }
    componentDidMount() {
        this.getDetails();
    }

    componentDidUpdate(prevProps) {
        if(this.props.currentOrderId && this.props.currentOrderId !== prevProps.currentOrderId) {
            this.getDetails();
        }
    }
    getDetails() {
        if (this.props.currentOrderId) {
            const details =  axios.get(`http://localhost:8081/order/${this.props.currentOrderId}`)
            .then((response) => {
                this.props.setCurrentOrder(response.data)
            }, this.props)
        }
    }

    orderShipped(order) {
        return (
        <div className="order-shipped">
                <h5>Get Excited</h5>
                <span>Fun stuff is headed your way </span>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <h5>Items Ordered: {order.items.length}</h5>
                </div>
                <div className="row order-detail-not-shipped" >
                    <div className="status-tracker">
                        <div>
                            <i className="fa fa-check-square-o fa-3x  center"></i>
                        </div>
                        <div className="line"></div>
                        <div >
                            Ordered
                        </div>
                    </div>

                    <div className="status-tracker" >
                        <div>
                            <i className="fa fa-truck  fa-3x center "></i>
                        </div>
                        <div className="line"></div>
                        <div >
                            Shipped
                    </div>
                    </div>
                    <div className="status-tracker">
                        <div>
                            <i className="fa fa-home fa-3x center "></i>
                        </div>
                        <div className="line"></div>
                        <div >
                            Delivered
                        </div>
                    </div>
                </div>
                {
                    order.shipments.map((shipment, index) => {
                        return <React.Fragment> <div className="row mt-2">
                            
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <h5> {shipment.carrier} tracking</h5>
                                <h6>{shipment.trackingNumber}</h6>
                                <h6>{shipment.trackingUrl}</h6>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <h5>Estimated Date</h5>
                                <div><span>{new Date(shipment.estimatedDeliveryDate).toDateString()}</span></div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12"><b>{order.shipingAddress.street}</b> 12345 peachtere industrila brand</div>
                        </div>
                        </React.Fragment>
                    })
                }
                
                {order.items.map((item, index) => {
                    return (
                        <div className="row mt-2" key={index}>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                                <div className="card">
                                    <div className="row no-gutters">
                                        <div className="col-sm-3">
                                            <img src={iphone} className="img-fluid" />
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="card-block px-2">
                                                <h3 className="card-title">{item.name}</h3>
                                                <p className="card-text">Quantity: {item.quantity}</p>
                                                <p className="card-text">Id: {item.id}</p>
                                                <p className="card-text">Model: {item.model}</p>
                                                <p className="card-text">Color: {item.skuAttributes.color}</p>
                                                <p className="card-text">Size: {item.skuAttributes.size}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        );
    }
    orderInProgress(order) {
        return <React.Fragment>
             <h5>Heads up: The shipping date Changed</h5>
            <span>Before we can complete your order,review the new Date to confirm if you're OK with it </span>
            <div className="row order-detail-not-shipped" >
                    <div className="status-tracker">
                        <div>
                            <i className="fa fa-check-square-o fa-3x  center"></i>
                        </div>
                        <div className="line"></div>
                        <div >
                            Ordered
                        </div>
                    </div>

                    <div className="status-tracker" >
                        <div>
                            <i className="fa fa-truck  fa-3x center "></i>
                        </div>
                        <span className="outer-line "></span>
                        <span className="fa fa-remove fa-2x" aria-hidden="true"></span>
                        <span className="outer-line "></span>
                        <div >
                            Shipped
                        </div>
                    </div>
                    <div className="status-tracker">
                        <div>
                            <i className="fa fa-home fa-3x center "></i>
                        </div>
                        <div className="line"></div>
                        <div >
                            Delivered
                        </div>
                    </div>
                </div>
            {order.items.map((item,index) => {
                                return <div key={index}>
                                    <div className="row mt-2">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <h5>Items Ordered: {order.items.length}</h5>
                                            <div> Don't forget to let us know if you accept the new ship Date. We'll cancel your order if we dont hear from you soon</div>

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <h5>New Estimated ship Date</h5>
                                            <div><span>{new Date(item.newEstimatedShipDateRange.fromDate).toDateString()} - {new Date(item.newEstimatedShipDateRange.toDate).toDateString()}</span></div>
                                            <h5>Original Estimated Date</h5>
                                            <div><span>{new Date(item.newEstimatedShipDateRange.fromDate).toDateString()} - {new Date(item.newEstimatedShipDateRange.toDate).toDateString()}</span></div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                        <div><b>Address: </b>{order.shipingAddress.street} {order.shipingAddress.city} {order.shipingAddress.state} {order.shipingAddress.zip}</div>
                        <div className="row mt-2">
                            <div className="col-sm">
                                <button type="button" className="btn btn-block btn-primary">Accept new ship date</button>
                            </div>
                            <div className="col-sm">
                                <button type="button" className="btn btn-block btn-light">Cancel your order</button>
                            </div>
                        </div>
                        {
                            order.items.map((item, index) => {
                                return (
                                    <div className="row mt-2" key={index}>
                                        <div className="col-md-6 col-lg-6 col-sm-12">
                                            <div className="card">
                                                <div className="row no-gutters">
                                                    <div className="col-sm-3">
                                                        <img src={iphone} className="img-fluid" />
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <div className="card-block px-2">
                                                            <h3 className="card-title">{item.name}</h3>
                                                            <p className="card-text">Quantity: {item.quantity}</p>
                                                            <p className="card-text">Id: {item.id}</p>
                                                            <p className="card-text">Model: {item.model}</p>
                                                            <p className="card-text">Color: {item.skuAttributes.color}</p>
                                                            <p className="card-text">Size: {item.skuAttributes.size}</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
        </React.Fragment>
    }
    buildOrdersTemplate(order) {
        if (order.items.length > 0) {
        return (
            <React.Fragment>
                {order.status === "ordered" && this.orderInProgress(order)}
                {order.status === "shipped" && this.orderShipped(order)}
            </React.Fragment>
            ) 
        } else return <div>No orders</div>
        
    }
  
    render() {
        console.log(this.props);
      return (
        <div className='container-fluid'>
            <div className="order-not-shipped">
                {this.props.currentOrder && this.buildOrdersTemplate(this.props.currentOrder)}
            </div>
        </div>
      );
    }
  }
  


const mapStateToProps = (state) => {
    console.log(state);
    return {
      currentOrderId: state.app.currentOrderId,
      currentOrder: state.app.currentOrder
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentOrder: (order) => {
            dispatch(setCurrentOrder(order));
        }
    }
  }
  
  const OrderDetail = connect(mapStateToProps, mapDispatchToProps)(OrderDetailComponent);
  export default OrderDetail;
  