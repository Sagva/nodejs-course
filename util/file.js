const fs = require('fs')

const deleteFile = (filePath) => {
    fs.unllink(filePath, (err) => {
        if(err) {
            throw(err)
        }
    })
}

exports.deleteFile = deleteFile