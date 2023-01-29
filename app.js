const express=require('express')
const app=express();
const path=require('path');
const mongoose = require('mongoose');

const bodyparser=require('body-parser');
const port=8000;






// express specific stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded());
// app.use(bodyparser.urlencoded({
//     extended:false
// }));



// getting-started.js

main().catch(err => console.log(err));

async function main() {
   await mongoose.connect('mongodb://localhost:/contactDance');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled

}


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });


  const contact = mongoose.model('contact', contactSchema);



// pug specific stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));






// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {};
    res.status(200).render('contact',params);
})


app.post('/contact', (req, res)=>{

    var myData=new contact(req.body);
    
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('http://localhost:27017/contact');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});