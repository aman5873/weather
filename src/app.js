const express = require("express");
const app = express();  // All express functionality can be accesed Through app.

const path = require("path");
const hbs = require("hbs")

/// DataBase connection
const DB_URL = 'mongodb+srv://aman:aman@cluster0.4s7yu.mongodb.net/mernregister?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(DB_URL).then(() =>{
    console.log('connection sucessfull to DB');
}).catch((err) =>{
    console.log('connection Failed to DB');
})

// require("./db/connect");
const Register = require("./models/registers"); // Registerring model/table

const port = process.env.PORT || 3000; // set port Number


//console.log(path.join(__dirname)) // Gives Current directory path i.e \src
// Set path 
const static_path = path.join(__dirname, "../public")  // for public folder->../ back to public
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

// Tell express that i'm using JSON
app.use(express.json())
app.use(express.urlencoded({extended:false}));  // we are using the data, which we get from post

// render static files
app.use(express.static(static_path))

//for rendering hbs templates
app.set("view engine", "hbs");
app.set("views", template_path)
hbs.registerPartials(partials_path)

// Routing
app.get("/", (req,res) => {
    res.render("index2")
});

app.get("/signIn", (req,res) => {
    res.render("register")
});
app.get("/login", (req,res) => {
    res.render("register")
});

app.get("/weather", (req,res) => {
    res.render("weather")
});

app.get("/about", (req,res) => {
    res.send("About PAGE")
});

//create new user in DB, after getting post request on singn In form 
app.post("/register", async(req,res) => {
    try{
        const password= req.body.password;
        const password1 = req.body.password1;
        // res.send(req.body.name);

        if(password===password1){
            const registerUser = new Register({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            })
            const registered =await registerUser.save();
            res.status(201).redirect("/");
        }
        else{
            res.send("Password are not matching");
        }
    }catch(error){
        res.status(400).send("Invalid Crediantials");
        // alert("Bad Crediantals");
    }
});

// Authenticate user for login when , submit post request in LogIn form
app.post("/login", async(req,res) => {
    try{
        const email= req.body.email;
        const password = req.body.password;
        
        const useremail = await Register.findOne({email:email});
        console.log(useremail.name);
        if(useremail.password === password){
            const name=useremail.name;
            // res.status(201).redirect("/");
            res.render('index2',{
                name
            })
            
        }else{
            // res.send("Invalid Crediantials");
            res.render('error',{
                errormsg:'Invalid Credential!'
            })
        }
    }catch(error){
        // res.status(400).send("Invalid Crediantials");

        res.render('error',{
            errormsg : error
        })
    }
});

// Routing Error Page
app.get("*", (req,res) => {
    res.render('error',{
        errormsg:'Page Not Found'
    })
});

app.listen(port, () =>{
    console.log(`Server started at port : ${port}`);
})
