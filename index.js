if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })