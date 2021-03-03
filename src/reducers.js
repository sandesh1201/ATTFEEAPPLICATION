import { INCREMENT_COUNT, SET_CURRENT_ORDER, SET_CURRENT_ORDER_ID, SET_ORDERS } from './actions';
const appInitialState = {
    count: 0,
    orders: [],
    currentOrder: null,
    currentOrderId: null
}
export const app = function (state = appInitialState, action) {
    switch (action.type) {
        case INCREMENT_COUNT: return Object.assign({}, state, { 
            count: state.count + 1
        }); 
        case SET_ORDERS: return Object.assign({}, state, {
            orders: action.orders
        });
        case SET_CURRENT_ORDER: return Object.assign({}, state, {
            currentOrder: action.order
        });
        case SET_CURRENT_ORDER_ID: return Object.assign({}, state, {
            currentOrderId: action.id
        });
        default: return state
    }
}