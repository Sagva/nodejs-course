//this code will run in the client, so in the browser (not on the server )
// we are importing this file into products page 

const deleteProduct = (btn) => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    fetch('/admin/product/' + prodId, {
        method: "DELETE",
        headers: {
            'csrf-token': csrf
        }
    })
    .then(result => console.log(result))
    .catch(err => console.log(err))
};