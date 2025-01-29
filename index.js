const express=require('express');
const dotenv=require('dotenv');
const db=require('./config/db');
dotenv.config({path:'config.env'});
const methodOverride = require('method-override');
const path = require("path");


const app=express();
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views"));

// // Serve static files
app.use(express.static(path.join(__dirname, "public")));

//middleware 
app.use(express.json());

//connect to mongodb
db();

//routes
app.use('/',require('./routes/BoardRoutes'));


const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
});
  
