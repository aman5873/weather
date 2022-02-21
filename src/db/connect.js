const mongoose = require("mongoose");

// const DB_URL = 'mongodb+srv://aman:aman@cluster0.4s7yu.mongodb.net/mernregister?retryWrites=true&w=majority' // Atlas-Db
const DB_URL = 'mongodb://localhost:27017/mernregister' // local-Db
mongoose.connect(DB_URL)
.then(() => {
    console.log(`sucessfully connected to DB`);
})
.catch((e) => {
    console.log(`Failed connection to DB`);
})
