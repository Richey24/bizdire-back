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
    lat: {
        type: String
    },
    long: {
        type: String
    },
    image: {
        type: String
    },
    city: {
        type: String
    },
    state: {
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
    userName: {
        type: String
    },
    userImage: {
        type: String
    },
    userNumber: {
        type: String
    },
    category: {
        type: String
    },
    zipcode: {
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
    featured: {
        type: Boolean,
        default: false
    },
    showcase: {
        type: Boolean,
        default: false
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
    email: {
        type: String
    },
    website: {
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
    image: {
        type: String
    },
    noOfListings: {
        type: Number
    },
    cities: {
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

const event = mongoose.Schema({
    userID: {
        type: String
    },
    userName: {
        type: String
    },
    eventName: {
        type: String
    },
    contactPoc: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    website: {
        type: String
    },
    dateOfEvent: {
        type: Array
    },
    timeOfEvent: {
        type: Array
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    locationType: {
        type: String
    },
    zipcode: {
        type: String
    },
    lat: {
        type: String
    },
    long: {
        type: String
    },
    cost: {
        type: String
    },
    image: {
        type: String
    },
    userImage: {
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
const BizCat = mongoose.model("Biz_cat", category, "biz_cat")
const BizLocation = mongoose.model("Biz_loc", location, "biz_loc")
const BizEvent = mongoose.model("Biz_event", event, "biz_event")

module.exports = { BusinessUser, BusinessListing, BizCat, BizLocation, BizEvent }