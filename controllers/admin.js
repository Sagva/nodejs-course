const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit //by trying to access a key edit we can check if it exists, the extracted value is always a string, so it will be "true" instead of true
  console.log(`editMode`, editMode) // need to add to url '?edit=true' as http://localhost:3000/admin/edit-product/15632?edit=true
  if(!editMode) { //if '?edit=true' will not found among querys, editMode will be sett as undefined 
    return res.redirect('/')
  }
  const prodId = req.params.productId // here we can access productId from url because we have the dynamic segment 'productId' in the router: router.get('/edit-product/:productId', adminController.getEditProduct)
  Product.findById(prodId, product => {
    if(!product) {
      return res.redirect('/') //for now we will redirect to mane page if there is no product, later we'll add error message
    }
    res.render('admin/edit-product', { 
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product //if the product was found, we pat it in the object and render on the page at route admin/edit-product'
    });
  })
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
