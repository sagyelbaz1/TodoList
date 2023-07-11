const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const axios= require("axios").default;

app.set("view engine", "ejs");

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

const serverUrl = "http://localhost:3001/";

app.get("/",async (req, res) => {
    try{
        const response = await axios.get(serverUrl+'getTodoList');
        res.render("index", { todolist: response.data});
    }
    catch(err){
        console.log(err);
    }
});

app.post('/create',async (req, res) => {
    await axios.post(serverUrl+'create',req.body)
            .then(function (response) {
                res.redirect("/");
            })
            .catch(function (error) {
                console.log(error);
            });
});

app.post('/delete',async (req, res) => {
    await axios.post(serverUrl+'delete',req.body)
            .then(function (response) {
                res.redirect("/");
            })
            .catch(function (error) {
                console.log(error);
            });
});

app.post('/changeStatus',async (req, res) => {
    await axios.post(serverUrl+'changeStatus',req.body)
        .then(function (response) {
            res.redirect("/");
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.listen(3000, (req, res) => {
    console.log("App is running on port 3000");
});

