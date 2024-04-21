const express = require("express");
const cors = require("cors");


const app = express(); 
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());


const offerController = require("./controller/offer");
const requestController = require("./controller/request");
const categoryController = require("./controller/category");




app.use("/offer", offerController);
app.use("/request", requestController);
app.use("/category", categoryController);





app.listen(port, () => {
    console.log("Server is listening on port 3000");
})

