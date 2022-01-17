import {url} from '../utils/url';
import axios from 'axios';
//retrive all customer pools
export const all_customer_pools = () => {
    return axios.get(url + '/retrieve_customer_pools')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all customer pool by id
export const customer_pool_by_id = (id) => {
    return axios.get(url + '/retrieve_customer_pool/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all vendor pools
export const all_vendor_pools = () => {
    return axios.get(url + '/retrieve_vendor_pools')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all vendor pool by id
export const vendor_pool_by_id = (id) => {
    return axios.get(url + '/retrieve_vendor_pool/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all customer vendor pools
export const all_customer_vendor_pools = () => {
    return axios.get(url + '/retrieve_vendor_customer_cross_pools')
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrive all customer vendor pool by id
export const customer_vendor_pool_by_id = (id) => {
    return axios.get(url + '/retrieve_vendor_custmer_cross_pool/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}