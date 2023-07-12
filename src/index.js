import app from './app.js'
import { ConectDB } from './db.js'

ConectDB()
app.listen(3000)
console.log("server on port", 3000)