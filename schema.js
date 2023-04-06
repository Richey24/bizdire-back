const mongoose = require("mongoose")

const user = mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    zipcode: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    mainToken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

const listing = mongoose.Schema({
    title: {
        type: String
    },
    userID: {
        type: String
    },
    category: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    publish: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    phoneNumber: {
        type: String
    },
    openingDays: {
        type: Array
    },
    openingTime: {
        type: String
    },
    closingTime: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    facebookUrl: {
        type: String
    },
    twitterUrl: {
        type: String
    },
    googlePlusUrl: {
        type: String
    },
    googleMapUrl: {
        type: String
    },
    establishedYear: {
        type: String
    },
    paymentMethod: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

const category = mongoose.Schema({
    category: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

const location = mongoose.Schema({
    state: {
        type: String
    },
    city: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const BusinessUser = mongoose.model("Business_user", user, "business_user")
const BusinessListing = mongoose.model("Business_listing", listing, "business_listing")
const BizCat = mongoose.model("Biz_cat", category, "biz_cat")
const BizLocation = mongoose.model("Biz_loc", location, "biz_loc")

module.exports = { BusinessUser, BusinessListing, BizCat, BizLocation }