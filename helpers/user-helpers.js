var db = require('../config/connection')
var collections = require('../config/collections')
const bcrypt = require('bcrypt');
const { response } = require('express')


module.exports = {
//---------------------------------------------------------------------------------------------------

    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            userData.Active = true
            db.get().collection(collections.USER_COLLECTION).insertOne(userData).then((data) => {

                resolve(data.insertedId)
            })
        })

    },

//----------------------------------------------------------------------------------------------------
    doLogin: (userData) => {

        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}

            let user = await db.get().collection(collections.USER_COLLECTION).findOne({ email: userData.email })
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status && user.Active) {

                        response.user = user;
                        response.status = true;
                        resolve(response)
                    }
                    else {

                        resolve({ status: false })
                    }

                })
            } else {

                resolve({ status: false })

            }
        })
    },
//------------------------------------------------------------------------------------------------------
proDetails: (proId) => {
    return new Promise(async (resolve, reject) => {
        productDetails = await db.get().collection(collections.PRODUCT_COLLECTION).findOne({ _id: objectId(proId) })
        resolve(productDetails)
    })
},



}