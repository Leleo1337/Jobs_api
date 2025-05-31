import express from 'express'
import { configDotenv } from 'dotenv'

configDotenv()

const app = express()
app.use(express.json())

app.get('/', (req,res) => {
    res.send('teste')
})

export default app