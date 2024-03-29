require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
// app.use((req, res, next) => res.header('Access-Control-Allow-Origin', '*'))
app.use('/api', router)
// Обработка ошибок (последний middleware)
app.use(errorHandler)


const start = async () => {
    try{
        // await sequelize.authenticate()
        // await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()