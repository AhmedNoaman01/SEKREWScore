const mongoose=require('mongoose');

const db=()=>{
    mongoose.connect("mongodb+srv://ahmed:ahmed@cluster0.cdir2.mongodb.net/SCORE-BOARD", {useNewUrlParser: true, useUnifiedTopology: true});
const con=mongoose.connection;
con.on('error',()=>{
    console.log('DB connection failed');
});

con.once('open',()=>{
    console.log('DB connected successful');
});
}
module.exports=db;