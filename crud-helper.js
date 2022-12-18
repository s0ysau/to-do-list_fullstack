// Connect to the database
require('dotenv').config();
require('./config/db');

// Require the Mongoose models
// const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

const Todo = require('./models/todo')

// Local variables will come in handy for holding retrieved documents
let user, item, category, order, todo;
let users, items, categories, orders, todos;