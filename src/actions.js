export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const SET_ORDERS = 'SET_ORDERS';
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const SET_CURRENT_ORDER_ID = 'SET_CURRENT_ORDER_ID'
export const incrementCount  = () => {
    return {
        type: INCREMENT_COUNT
    }
}

export const setOrders = (orders) => {
    return {
        type: SET_ORDERS,
        orders
    }
}

export const setCurrentOrder = (order) => {
    return {
        type: SET_CURRENT_ORDER,
        order
    }
}
export const setCurrentOrderId = (id) => {
    return {
        type: SET_CURRENT_ORDER_ID,
        id
    }
}
