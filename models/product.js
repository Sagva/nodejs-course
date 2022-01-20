
const db = require('../util/database')//give access to the pool
const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;

  }

  save() {
    return db.execute(
      // question marks used to secure inserting of data, Packsge mysql2 will secure replace them with data
      'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.description, this.imageUrl]
    )
    
  }

  static deleteById(id) {
    
  }

  static fetchAll() {
   return db.execute('SELECT * FROM products')
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }
};
