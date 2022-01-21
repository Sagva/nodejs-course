const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')

const sequelize = require('./util/database')

const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//will run on incoming request, so the user will be already exist, because we create it on starting the app (not on incoming request)
app.use((req,res, next) => {
    User.findByPk(1)
    .then(user => {//user here is a sequelize object with all available methods (e.g. createProduct)
        req.user = user //storing th user we retrieved fron DB in the request
        next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart) //will add a key to the cart (user Id)
Cart.belongsTo(User)

Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})

sequelize.sync({force: true}) //{force: true} will overwrite tables every time the app starts
// sequelize.sync() //runs on the app start
.then(result => {
    // console.log(`result`, result)
    return User.findByPk(1) //check if we already have a user with id = 1 and if we have it we will not create a new one. If we don't have then we will create a new one
})
.then(user => {
    if(!user) {// if this is null, create a new user
        return User.create({name: 'Elena', email: 'test@test.com'}) //return a promise
    }
    return user //if user exist return it. Returns an js object
})
.then(user => {
    console.log(`user`, user)
    app.listen(3000);
})
.catch(err => console.log(err)) 



