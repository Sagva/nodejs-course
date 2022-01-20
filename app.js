const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error')

const sequelize = require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync() //sync method has a look at all the models you defined (we defined the model in './util/database')
//and then it creates tables for them. It syncs our modals to the database by creating the appropriate tables and relations (if you have them)
.then(result => {
    // console.log(`result`, result)
    app.listen(3000);
})
.catch(err => console.log(err)) 



