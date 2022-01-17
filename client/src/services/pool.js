import {url} from '../utils/url';
import axios from 'axios';
//retrive all customer pools
export const all_customer_pools = () => {
    return axios.get(url + '/retrieve_customer_pools')
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