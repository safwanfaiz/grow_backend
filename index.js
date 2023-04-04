const express = require("express");
const { connect } = require("./config/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");


const { userRout } = require("./routes/user.routes");

const { Auth } = require("./middleware/middlevare");



const App = express();
App.use(express.json());

App.use(cors({ origin: "*" }));

App.get("/", (req, res) => {
    res.send(" Welcome to homepage ");
});



App.use("/user", userRout)
App.use(Auth)



App.listen(8080, async () => {
    try {
        await connect;
        console.log(" connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log(`App running at port 8080`);
});