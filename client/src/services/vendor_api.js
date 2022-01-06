import {url} from '../utils/url';
import axios from 'axios';
//retrieve all vendor addresses
export const all_vendor_addresses = (vendorId) => {
    return axios.get(url + '/retrieve_vendor_address_by_vendorId/' + vendorId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrieve vendor address by id
export const vendor_address_by_id = (id) => {
    return axios.get(url + '/retrieve_vendor_address/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrieve all items using vendor id
export const all_vendor_items_by_id = (vendorId) => {
    return axios.get(url + '/vendors_retrive_item/' + vendorId)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}

//retrieve all items using id
export const all_vendor_items_by_itemid = (id) => {
    return axios.get(url + '/retrive_vendor_item/' + id)
    .then(res => {
        return res.data;
    }).catch(err => console.log(err))
}