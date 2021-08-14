const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoose = require('mongoose');

const create_user_category = require('./routes/userCategory/create_user_category');
const delete_user_category = require('./routes/userCategory/delete_user_category');
const retrive_user_category = require('./routes/userCategory/retrive_user_category');
const update_user_category = require('./routes/userCategory/update_user_category');

const create_user = require('./routes/user/user/create_user');
const delete_user = require('./routes/user/user/delete_user');
const login_user = require('./routes/user/user/login_user');
const retrive_user = require('./routes/user/user/retrive_user');
const update_user = require('./routes/user/user/update_user');
const reset_password=require('./routes/forgotpassword/resetpassword');

const retrive_vendor = require('./routes/user/vendor/retrive_vendor');
const deactivate_vendor=require('./routes/user/vendor/deactivated_vendor');
const update_vendor=require('./routes/user/vendor/update_vendor');

const retrive_customer= require('./routes/user/customer/retrive_customer');
const update_customer=require('./routes/user/customer/update_customer');

const create_item_category = require('./routes/itemCategory/create_item_category');
const delete_item_category = require('./routes/itemCategory/delete_item_category');
const retrive_item_category = require('./routes/itemCategory/retrive_item_category');
const update_item_category = require('./routes/itemCategory/update_item_category');

const create_item_grade = require('./routes/itemGrade/create_item_grade');
const delete_item_grade = require('./routes/itemGrade/delete_item_grade');
const retrive_item_grade = require('./routes/itemGrade/retrive_item_grade');
const update_item_grade = require('./routes/itemGrade/update_item_grade');

const create_item_unit = require('./routes/itemUnit/create_item_unit');
const delete_item_unit = require('./routes/itemUnit/delete_item_unit');
const retrive_item_unit = require('./routes/itemUnit/retrive_item_unit');
const update_item_unit = require('./routes/itemUnit/update_item_unit');

const create_item = require('./routes/item/create_item');
const delete_item = require('./routes/item/delete_item');
const retrive_item = require('./routes/item/retrive_item');
const update_item = require('./routes/item/update_item');

const create_address = require('./routes/address/create_address');
const delete_address = require('./routes/address/delete_address');
const retrive_address = require('./routes/address/retrive_address');
const update_address = require('./routes/address/update_address');

const create_bank = require('./routes/bankDetails/create_bank');
const delete_bank = require('./routes/bankDetails/delete_bank');
const retrive_bank = require('./routes/bankDetails/retrive_bank');
const update_bank = require('./routes/bankDetails/update_bank');

const create_inventoryType = require('./routes/inventoryType/create_inventoryType');
const delete_inventoryType = require('./routes/inventoryType/delete_inventoryType');
const retrive_inventoryType = require('./routes/inventoryType/retrive_inventoryType');
const update_inventoryType = require('./routes/inventoryType/update_inventoryType');

const create_indent = require('./routes/indent/create_indent');
const delete_indent = require('./routes/indent/delete_indent');
const retrive_indent = require('./routes/indent/retrive_indent');
const update_indent = require('./routes/indent/update_indent');

const create_invoice = require('./routes/invoice/generate_invoice');
const delete_invoice = require('./routes/invoice/delete_invoice');
const retrive_invoice =require('./routes/invoice/retrive_invoice');
const update_invoice = require('./routes/invoice/update_invoice');

const create_grn = require('./routes/grn/create_grn');
const delete_grn = require('./routes/grn/delete_grn');
const retrive_grn =require('./routes/grn/retrive_grn');
const update_grn = require('./routes/grn/update_grn');

const create_order = require('./routes/order/createorder');
const retrive_order = require('./routes/order/retrive_order');
const retrive_all_order = require('./routes/order/retrive_order');
const update_order = require('./routes/order/update_order');
const delete_order = require('./routes/order/delete_order');

const create_purchase_order = require('./routes/purchase_order/create_purchase_order');
const retrive_purchase_order = require('./routes/purchase_order/retrive_purchase_order');
const retrive_all_purchase_order = require('./routes/purchase_order/retrive_purchase_order');
const update_purchase_order = require('./routes/purchase_order/update_purchase_order');
const delete_purchase_order = require('./routes/purchase_order/delete_purchase_order');

const retrive_inventory = require('./routes/inventory/retrive_inventory');
const update_inventory = require('./routes/inventory/update_inventory');

const create_payment = require('./routes/payment/create_payment');
const update_payment = require('./routes/payment/update_payment');
const retrive_payment = require('./routes/payment/retrive_payment');
const retrive_all_payment = require('./routes/payment/retrive_payment');

const pickup_assignment = require('./routes/pickup_assignment/pickup_assignment');
const retrive_pickup_assignment = require('./routes/pickup_assignment/retrive_pickup_assignment');
const retrive_all_pickup_assignments = require('./routes/pickup_assignment/retrive_pickup_assignment');


const delivery_assignment = require('./routes/delivery_assignment/delivery_assignment');
const retrive_delivery_assignment = require('./routes/delivery_assignment/retrive_delivery_assignment');
const retrive_all_delivery_assignments = require('./routes/delivery_assignment/retrive_delivery_assignment');

mongoose.connect("mongodb+srv://asthara_pankaj:asthara_pankaj@astharadb.8j9fd.mongodb.net/astharadb?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('Database Connected Successfully'))
.catch((err) => console.error('Database Connection Failed'));

app.get('/', (req, res)=>{
    res.send("Welcome to Asthara Agro Server");
});

app.use('/', create_user_category);
app.use('/', delete_user_category);
app.use('/', retrive_user_category);
app.use('/', update_user_category);

app.use('/', retrive_vendor);
app.use('/', deactivate_vendor);
app.use('/', update_vendor);

app.use('/', retrive_customer);
app.use('/', update_customer);

app.use('/', create_user);
app.use('/', login_user);
app.use('/', delete_user);
app.use('/', retrive_user);
app.use('/', update_user);
app.use('/',reset_password);

app.use('/', create_item_category);
app.use('/', delete_item_category);
app.use('/', retrive_item_category);
app.use('/', update_item_category);

app.use('/', create_item_unit);
app.use('/', delete_item_unit);
app.use('/', retrive_item_unit);
app.use('/', update_item_unit);

app.use('/', create_item_grade);
app.use('/', delete_item_grade);
app.use('/', retrive_item_grade);
app.use('/', update_item_grade);

app.use('/', create_item);
app.use('/', delete_item);
app.use('/', retrive_item);
app.use('/', update_item);

app.use('/', create_address);
app.use('/', delete_address);
app.use('/', retrive_address);
app.use('/', update_address);

app.use('/', create_bank);
app.use('/', delete_bank);
app.use('/', retrive_bank);
app.use('/', update_bank);

app.use('/', create_inventoryType);
app.use('/', delete_inventoryType);
app.use('/', retrive_inventoryType);
app.use('/', update_inventoryType);

app.use('/', create_indent);
app.use('/', delete_indent);
app.use('/', retrive_indent);
app.use('/', update_indent);

app.use('/', create_invoice);
app.use('/', delete_invoice);
app.use('/', retrive_invoice);
app.use('/', update_invoice);

app.use('/', create_grn);
app.use('/', delete_grn);
app.use('/', retrive_grn);
app.use('/', update_grn);

app.use('/', create_order);
app.use('/', retrive_order);
app.use('/', retrive_all_order);
app.use('/', delete_order);
app.use('/', update_order);

app.use('/', create_purchase_order);
app.use('/', retrive_purchase_order);
app.use('/', retrive_all_purchase_order);
app.use('/', delete_purchase_order);
app.use('/', update_purchase_order);

app.use('/', retrive_inventory);
app.use('/', update_inventory);

app.use('/', create_payment);
app.use('/', retrive_payment);
app.use('/', retrive_all_payment);
app.use('/', update_payment);

app.use('/', pickup_assignment);
app.use('/', retrive_pickup_assignment);
app.use('/', retrive_all_pickup_assignments);

app.use('/', delivery_assignment);
app.use('/', retrive_delivery_assignment);
app.use('/', retrive_all_delivery_assignments);


app.listen(5000, ()=>{
    console.log("Asthara Agro server running on port 5000");
});
