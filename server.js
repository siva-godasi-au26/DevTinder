const express = require('express')
const userRoutes = require('./routes/userRoute');
const reuestRoutes = require('./routes/requestRouter')
const app = express()
const connectDB = require('./configuration/database')
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api',userRoutes)
app.use('/api',reuestRoutes)

app.get('/',(req,res)=>{
    res.send('server started')
})

connectDB()
.then(()=>{
    console.log('db connected successfully')
    app.listen(66,()=>{
        console.log('server started')
    })
})
.catch(()=>{
    console.log('db connection failed please check')
})
