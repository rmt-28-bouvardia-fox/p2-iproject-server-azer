const {Customer} = require('../models')

const { compare } = require('../helper/bcrypt')
const { createToken } = require('../helper/jwt.js')

const register = async (req, res, next) => {
    try {
        let body = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }

        let data = await Customer.create(body)
        res.status(201).json(data)    
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        let body = {
            email: req.body.email,
            password: req.body.password
        }
        const user = await Customer.findOne({
            where: {
                email: body.email
            }
        })
        if (!user){
            throw {name : 'Invalid email/password'}
        }
        const passwordVal = compare(body.password, user.password)
            if(!passwordVal){
                throw {name : 'Invalid email/password'}
            }
            
            const payload = {
                id: user.id,
                email: user.email
            }

            const token = createToken(payload)
            res.status(200).json({access_token: token})
    } catch (error) {
        next(error)
    }
}

module.exports = authentication