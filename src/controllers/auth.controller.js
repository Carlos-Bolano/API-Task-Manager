import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { email, password, username, ocupation } = req.body

    try {
        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(['the email alredy in use'])

        const usernameFound = await User.findOne({ username })
        if (usernameFound) return res.status(400).json(['the username alredy in use'])

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            ocupation,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved.id })
        res.cookie("token", token)
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            ocupation: userSaved.ocupation,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(400).json(["User no found"])

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json(["Password no valid"])

        const token = await createAccessToken({ id: userFound.id })
        res.cookie("token", token)
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    res.cookie("token", "",
        { expires: new Date(0) })
    res.sendStatus(200)
}

export const profile = async (req, res) => {
    try {
        const id = req.user.id
        const userFound = await User.findById(id)
        if (!userFound) return res.status(400).json({ message: "User no found" })

        return res.json({
            id: userFound.id,
            username: userFound.username,
            ocupation: userFound.ocupation,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        console.log(error)
    }
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "Unauthorized" })

    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" })

        const userFound = await User.findById(decoded.id)
        if (!userFound) return res.status(401).json({ message: "Unauthorized" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            ocupation: userFound.ocupation,
            email: userFound.email
        })
    })

}
