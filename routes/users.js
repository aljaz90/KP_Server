const   express     = require("express"),
        router      = express.Router(),
        resolvers   = require('../graphql/Resolvers'),
        xml2js      = require('xml2js'),
        { authenticate } = require('ldap-authentication');


// Get users
router.get('/', async (req, res) => {
    try {
        const users = await resolvers.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
router.get('/xml', async (req, res) => {
    try {
        const users = (await resolvers.getUsers()).map(user => ({...user._doc, _id: user._id.toString()}));

        res.set('Content-Type', 'application/xml');
        const builder = new xml2js.Builder();
        res.send(builder.buildObject({Users: {User: users}}));
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
router.get('/text', async (req, res) => {
    try {
        const users = await resolvers.getUsers();
        res.send(users.toString());
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await resolvers.getUser({id: req.params.id});
        res.json(user);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
router.get('/:id/xml', async (req, res) => {
    try {
        let user = (await resolvers.getUser({id: req.params.id}));
        user = {...user._doc, _id: user._id.toString()};

        res.set('Content-Type', 'application/xml');
        const builder = new xml2js.Builder();
        res.send(builder.buildObject({User: user}));
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
router.get('/:id/text', async (req, res) => {
    try {
        const user = await resolvers.getUser({id: req.params.id});
        res.send(user.toString());
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
// Create user
router.post('/', async (req, res) => {
    try {
        const user = await resolvers.createUser({name: req.body.name, email: req.body.email, password: req.body.password});
        res.json(user);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
// Update user
router.put('/:id', async (req, res) => {
    try {
        const user = await resolvers.updateUser({id: req.params.id, name: req.body.name, email: req.body.email, password: req.body.password});
        res.json(user);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});
// Delete user
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

        const user = await resolvers.deleteUser({id: req.params.id});
        res.json(user);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});

module.exports = router;