const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mernregister")
.then(() => {
    console.log(`sucessfully connected to DB`);
})
.catch((e) => {
    console.log(`Failed connection to DB`);
})

// mongoose.connect("mongodb://localhost:27017/mernregister"),{
//     useNewUrlParser:true,   useUnifiedTopology:true,   useCreateIndex:true
// }