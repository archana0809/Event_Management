// models/Customer.js
const mongoose = require('mongoose');

// Define the Customer schema
const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  Date: {
    type: Date, // Event date
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
 image: {
  type: String,
  default: ''
}

}, { timestamps: true });

// Create and export the Customer model
const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
