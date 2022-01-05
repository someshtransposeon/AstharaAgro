
var jwt = require('jsonwebtoken');
import AsyncStorage from '@react-native-async-storage/async-storage';

export function current_user(){

    return console.log(jwt.decode(AsyncStorage.getItem('toen')));

}
//retrive users by category
export function all_users(host){
    return fetch(`http://${host}:5000/retrive_all_user`, {
         method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(allusers =>{
        return allusers;
    });
}
//retrive user by id
export function users_by_id(host,userId){
    return fetch(`http://${host}:5000/retrive_user/${userId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(user => {
        return user;
    });
}
//retrive all disabled users
export function disabled_users(host){
    return fetch(`http://${host}:5000/retrive_all_disabled_user`, {
            method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(allusers =>{
        return allusers;
    });
}
//retive all users by category
export function all_users_by_category(host,category){
    return fetch(`http://${host}:5000/retrive_user_category_type/${category}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(data =>{
         return data;
    });
}
//retive all disabled users category
export function disabled_user_category(host){
    return fetch(`http://${host}:5000/retrive_all_disabled_user_category`, {
            method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(categories =>{
        return categories;
    });
}
//retive all disabled users category by id
export function disabled_all_disabled_user_category(host){
    return fetch(`http://${host}:5000/retrive_user_category`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(user => {
        return user;
    });
}
//retrive users address by user id
export function address_by_usersId(host,userId){
    return fetch(`http://${host}:5000/retrive_address_by_userId/${userId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(address => {
        return address;
    });
}
//retrive users address by user id
export function address_by_Id(host,addressId){
    return fetch(`http://${host}:5000/retrive_address/${addressId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(address => {
        return address;
    });
}
//retrive bank details by user id
export function bank_by_userId(host,userId){
    return fetch(`http://${host}:5000/retrive_bank_by_userId/${userId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(bank => {
        return bank;
    });
}
//retrive  user Category
export function user_category(host){
    return fetch(`http://${host}:5000/retrive_all_user_category`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(userCategory => {
        return userCategory;
    });
}
//retrive_all_customer
export function all_customer(host){
    return fetch(`http://${host}:5000/retrive_all_customer`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(customer =>{
         return customer;
    });
}
//retrive_all_customer by id
export function customer_by_id(host,id){
    return fetch(`http://${host}:5000/retrive_customer/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(customer => {
            return customer;
    });
}
//retrive all vendor
export function all_vendors(host){
    return fetch('http://localhost:5000/retrive_all_vendor', {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(vendors=>{
        return vendors;
    });
}
//retrive vendor by id
export function vendor_by_id(host,vendorId){
    return fetch(`http://${host}:5000/retrive_vendor/${vendorId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(vendor => {
        return vendor;
    });
}
//retrive_all_sales person
export function all_sales(host){
    return fetch(`http://${host}:5000/retrive_all_sales`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(sales => {
        return sales;
    });
}
