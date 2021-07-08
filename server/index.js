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

app.listen(5000, ()=>{
    console.log("Asthara Agro server running on port 5000");
});