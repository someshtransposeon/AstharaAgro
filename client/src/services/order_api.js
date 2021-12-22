export function allOrder(host){
    return fetch(`http://${host}:5000/retrive_all_order`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(orders => {
        return orders;
    });
}

export function Order_by_status(host, status){
    return fetch(`http://${host}:5000/retrive_orders_by_status/${status}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(orders => {
        return orders;
    });
}

export function Order_by_id(host, id){
    return fetch(`http://${host}:5000/retrive_order/${id}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(orders => {
        return orders;
    });
}

export function OrderSummary(host){
    return fetch(`http://${host}:5000/retrive_all_order_item_summary`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(orders => {
        return orders;
    });
}

export function OrderSummary_by_id(host, id){
    return fetch(`http://${host}:5000/retrive_all_order_item_summary_by_id/${id}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(orders => {
        return orders;
    });
}
//retrive_all_completed_order
export function all_completed_order(host){
    return fetch(`http://${host}:5000/retrive_all_completed_order`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(orders => {
             return orders;
    });
}
//retrive_all_completed_order by id
export function all_completed_order_by_id(host, id){
    return fetch(`http://${host}:5000/retrive_all_order_item_summary_by_id/${id}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(orders => {
        return orders;
    });
}
