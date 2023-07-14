import "dotenv/config"
import app from './app.js'
import { ConectDB } from './db.js'

const PORT = process.env.PORT 

ConectDB()
app.listen(PORT)
console.log("server on port", PORT)