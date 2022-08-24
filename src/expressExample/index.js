const express = require('express')
const morgan = require('morgan')

const {routes : {userRouter}} = require('./network')
const response = require('./network/routes/response')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('dev'))
app.use(userRouter)

app.use((req,  res) => {
    response({
        message: 'this route does not exists',
        res,
        status: 404
    })
})
app.listen(PORT,()=>{

    console.log(`server running at port ${PORT}`)

})