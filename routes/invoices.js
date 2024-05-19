const   express     = require("express"),
        router      = express.Router(),
        resolvers   = require('../graphql/Resolvers'),
        xml2js      = require('xml2js');

// Get invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await resolvers.getInvoices();
        res.json(invoices);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
router.get('/xml', async (req, res) => {
    try {
        const invoices = (await resolvers.getInvoices()).map(invoice => ({...invoice._doc, _id: invoice._id.toString(), customer: invoice.customer.toString(), paid_at: invoice.paid_at.toString()}));

        res.set('Content-Type', 'application/xml');
        const builder = new xml2js.Builder();
        res.send(builder.buildObject({Invoices: {Invoice: invoices}}));
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
router.get('/text', async (req, res) => {
    try {
        const invoices = await resolvers.getInvoices();
        res.send(invoices.toString());
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
// Get invoice by id
router.get('/:id', async (req, res) => {
    try {
        const invoice = await resolvers.getInvoice({id: req.params.id});
        res.json(invoice);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
router.get('/:id/xml', async (req, res) => {
    try {
        let invoice = (await resolvers.getInvoice({id: req.params.id}));
        invoice = {...invoice._doc, _id: invoice._id.toString(), customer: invoice.customer.toString(), paid_at: invoice.paid_at.toString()};

        res.set('Content-Type', 'application/xml');
        const builder = new xml2js.Builder();
        res.send(builder.buildObject({Invoice: invoice}));
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
router.get('/:id/text', async (req, res) => {
    try {
        const invoice = await resolvers.getInvoice({id: req.params.id});
        res.send(invoice.toString());
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
// Create invoice
router.post('/', async (req, res) => {
    try {
        const invoice = await resolvers.createInvoice({amount: req.body.amount, paid_at: req.body.paid_at, customer: req.body.customer});
        res.json(invoice);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
// Update invoice
router.put('/:id', async (req, res) => {
    try {
        const invoice = await resolvers.updateInvoice({id: req.params.id, amount: req.body.amount, paid_at: req.body.paid_at, customer: req.body.customer});
        res.json(invoice);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
// Delete invoice
router.delete('/:id', async (req, res) => {
    try {
        try {
            const username = req.headers.username ?? "";
            const password = req.headers.password ?? "";

            await authenticate({
                ldapOpts: { url: 'ldap://192.168.1.11' },
                userDn: `uid=${username},ou=People,dc=sk-01,dc=com`,
                userPassword: password,
            });
        } catch {
            res.status(401);
            return res.send("Unauthorized")
        }

        const invoice = await resolvers.deleteInvoice({id: req.params.id});
        res.json(invoice);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});

module.exports = router;