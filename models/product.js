const fs = require('fs')

const path = require('path')

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {

        //'data' folder name where to store created file, 'products.json' - file name, that we want to create
        const p = path.join(path.dirname(require.main.filename), 'data', 'products.json' )
        fs.readFile(p, (err, fileContent) => {
            let products = []
            if(!err) {// if where is no error, that means that file is already created
                console.log(`fileContent`, fileContent)
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err)=> {
                console.log(`err`, err)
            })
        })
    }

    static fetchAll(cb) { //cb - calback function that will be executed when fetchAll is done. When we are calling fetchAll we will pass a function it is being aware of being call which holds the data we want to return
        const p = path.join(path.dirname(require.main.filename), 'data', 'products.json' )
        fs.readFile(p, (err, fileContent) => {
            if(err) {//if there is an error, that means that there is no products yet 
               cb([])
            }
            cb(JSON.parse(fileContent))
        })
       
    }
}