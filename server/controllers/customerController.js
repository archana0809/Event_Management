const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * GET / - Homepage
 * Display the list of customers or search results
 */
exports.homepage = async (req, res) => {
  const locals = {
    title: 'Project',
    description: 'Event Management System',
  };

  const searchQuery = req.query.search || '';

  try {
    const customers = searchQuery
      ? await Customer.find({
          $or: [
            { firstName: { $regex: searchQuery, $options: 'i' } },
            { email: { $regex: searchQuery, $options: 'i' } },
            { details: { $regex: searchQuery, $options: 'i' } },
          ]
        }).limit(22)
      : await Customer.find().limit(22);

    res.render('index', { locals, customers, searchQuery });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * GET /add - Render the form to add a new customer
 */
exports.addEvent = (req, res) => {
  const locals = {
    title: 'Add New Event - Project',
    description: 'Event Management System',
  };
  res.render('customer/add', locals);
};

/**
 * POST /add - Create a new customer (with image)
 */
exports.postCustomer = async (req, res) => {
  const { firstName, Date, tel, email, details } = req.body;
  const image = req.file ? req.file.filename : ''; // handle image upload

  const newCustomer = new Customer({
    firstName,
    Date,
    tel,
    email,
    details,
    image,
  });

  try {
    await newCustomer.save();
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error adding customer');
  }
};

/**
 * GET /edit/:id - Render the form to edit a customer's details
 */
exports.editCustomer = async (req, res) => {
  const locals = {
    title: 'Edit Customer - Project',
    description: 'Event Management System',
  };

  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer not found');
    res.render('customer/edit', { locals, customer });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching customer for editing');
  }
};

/**
 * POST /edit/:id - Update customer details
 */
exports.updateCustomer = async (req, res) => {
  const { firstName, Date, tel, email, details } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { firstName, Date, tel, email, details },
      { new: true }
    );

    if (!updatedCustomer) return res.status(404).send('Customer not found');

    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating customer');
  }
};

/**
 * GET /delete/:id - Delete a customer
 */
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).send('Customer not found');
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting customer');
  }
};

/**
 * GET /view/:id - View customer details
 */
exports.viewCustomer = async (req, res) => {
  const locals = {
    title: 'View Customer - Project',
    description: 'Event Management System',
  };

  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer not found');
    res.render('customer/view', { locals, customer });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving customer details');
  }
};
