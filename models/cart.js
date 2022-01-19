const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id, productPrice) {
    //fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
        let cart = {products: [], totalPrice: 0}
        if(!err) {// if where is no error that means that the cart file is already exist, we parse it and save in the variable cart
            cart = JSON.parse(fileContent)
        }
        //analyze the cart => find existing product
        const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
        const existingProduct = cart.products[existingProductIndex]
    
        let updatedProduct
        //add new product/increase quantity
        if(existingProduct) {//  Does the product we are adding already exist in our cart?
            updatedProduct = {...existingProduct}
            updatedProduct.qty = updatedProduct.qty + 1 // If yes, increment the existing object's quantity by 1.
            cart.products = [...cart.products]
            cart.products[existingProductIndex] = updatedProduct
        } else {//If no, create an object with an ID set to the product's ID and a quantity set to 1.
            updatedProduct = {id: id, qty: 1}
            cart.products = [...cart.products, updatedProduct]
        }
        cart.totalPrice = cart.totalPrice + +productPrice
        fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(`err`, err)
        })
    })
    }
}