const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoose = require('mongoose');

const create_user_category = require('./routes/userCategory/create_user_category');
const delete_user_category = require('./routes/userCategory/delete_user_category');
const retrive_user_category = require('./routes/userCategory/retrive_user_category');
const update_user_category = require('./routes/userCategory/update_user_category');

const create_user = require('./routes/user/create_user');
const delete_user = require('./routes/user/delete_user');
const login_user = require('./routes/user/login_user');
const retrive_user = require('./routes/user/retrive_user');
const update_user = require('./routes/user/update_user');

const create_item_category = require('./routes/itemCategory/create_item_category');
const delete_item_category = require('./routes/itemCategory/delete_item_category');
const retrive_item_category = require('./routes/itemCategory/retrive_item_category');
const update_item_category = require('./routes/itemCategory/update_item_category');

const create_item = require('./routes/item/create_item');
const delete_item = require('./routes/item/delete_item');
const retrive_item = require('./routes/item/retrive_item');
const update_item = require('./routes/item/update_item');

const create_indent = require('./routes/indent/create_indent');
const delete_indent = require('./routes/indent/delete_indent');
const retrive_indent = require('./routes/indent/retrive_indent');
const update_indent = require('./routes/indent/update_indent');

const create_invoice = require('./routes/invoice/generate_invoice');
const delete_invoice = require('./routes/invoice/delete_invoice');
const retrive_invoice =require('./routes/invoice/retrive_invoice');
const update_invoice = require('./routes/invoice/update_invoice');

const create_grn = require('./routes/invoice/create_grn');
const delete_grn = require('./routes/invoice/delete_grn');
const retrive_grn =require('./routes/invoice/retrive_grn');
const update_grn = require('./routes/invoice/update_grn');

const create_order = require('./routes/order/createorder');
const retrive_order = require('./routes/order/retrive_order');
const retrive_all_order = require('./routes/order/retrive_order');
const update_order = require('./routes/order/update_order');
const delete_order = require('./routes/order/delete_order');


mongoose.connect("mongodb+srv://asthara_pankaj:asthara_pankaj@astharadb.8j9fd.mongodb.net/astharadb?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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

app.use('/', create_user);
app.use('/', login_user);
app.use('/', delete_user);
app.use('/', retrive_user);
app.use('/', update_user);

app.use('/', create_item_category);
app.use('/', delete_item_category);
app.use('/', retrive_item_category);
app.use('/', update_item_category);

app.use('/', create_item);
app.use('/', delete_item);
app.use('/', retrive_item);
app.use('/', update_item);

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

app.listen(5000, ()=>{
    console.log("Asthara Agro server running on port 5000");
});
