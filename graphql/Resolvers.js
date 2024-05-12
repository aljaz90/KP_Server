const User = require("../models/User");
const Invoice = require("../models/Invoice");

const resolvers = {
    // User
    getUser: async ({ id }) => {
        try {
            const user = await User.findById(id);
            return user;
        } catch (err) {
            throw new Error("Error retrieving user");
        }
    },
    getUsers: async () => {
        try {
            const users = await User.find();
            return users;
        } catch (err) {
            throw new Error("Error retrieving users");
        }
    },
    createUser: async ({ name, email, password }) => {
        try {
            const user = new User({ name, email, password });
            await user.save();
            return user;
        } catch (err) {
            throw new Error("Error creating user");
        }
    },
    updateUser: async ({ id, name, email, password }) => {
        try {
            const user = await User.findByIdAndUpdate(
                id,
                { name, email, password },
                { new: true }
            );
            return user;
        } catch (err) {
            throw new Error("Error updating user");
        }
    },
    deleteUser: async ({ id }) => {
        try {
            const user = await User.findByIdAndDelete(id);
            return user;
        } catch (err) {
            throw new Error("Error deleting user");
        }
    },
    // Invoice
    getInvoice: async ({ id }) => {
        try {
            const invoice = await Invoice.findById(id);
            return invoice;
        } catch (err) {
            throw new Error("Error retrieving invoice");
        }
    },
    getInvoices: async () => {
        try {
            const invoices = await Invoice.find();
            return invoices;
        } catch (err) {
            throw new Error("Error retrieving invoices");
        }
    },
    createInvoice: async ({ amount, paid_at, customer }) => {
        try {
            const invoice = new Invoice({ amount, paid_at, customer });
            await invoice.save();
            return invoice;
        } catch (err) {
            throw new Error("Error creating invoice: " + err);
        }
    },
    updateInvoice: async ({ id, amount, paid_at, customer }) => {
        try {
            const invoice = await Invoice.findByIdAndUpdate(
                id,
                { amount, paid_at, customer },
                { new: true }
            );
            return invoice;
        } catch (err) {
            throw new Error("Error updating invoice");
        }
    },
    deleteInvoice: async ({ id }) => {
        try {
            const invoice = await Invoice.findByIdAndDelete(id);
            return invoice;
        } catch (err) {
            throw new Error("Error deleting invoice");
        }
    },
};

module.exports = resolvers;