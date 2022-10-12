const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_TOKEN

const createToken = (payload)=> jwt.sign(payload, secretKey)

const verified = (token)=> jwt.verify(token, secretKey)

module.exports = {createToken, verified}