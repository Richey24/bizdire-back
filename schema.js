const mongoose = require("mongoose")

const user = mongoose.Schema({
    email: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
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

const BusinessUser = mongoose.model("Business_user", user, "business_user")
const BusinessListing = mongoose.model("Business_listing", listing, "business_listing")

module.exports = { BusinessUser, BusinessListing }