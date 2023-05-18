const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt');
const jwt = require('jwt');

___  
router.post('/', async (req, res) => {
    console.log(req.session.userId)
    
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId })        
        res.json({ user: user, token: result.value })                                       
    }
})

router.get('/profile', async (req, res) => {
    try {
        // split the authorization header into [ "Bearer", "TOKEN"]:
        const [authenticationMethod, token] = req.headers.authorization.split(' ')

        // only handle "bearer" authorization for now 
        // decode the JWT
        const result = await jwt.decode(process.env.JWT_SECRET, token)

        // get logged in users id from the payload
        const { id } = result.value

        // find the user object using their id

        let user = await User.findOne({
            where: {
                userId: id                    
            }
        })
        res.json(user)
    } catch {
        res.json(null)
    }
})


module.exports = router