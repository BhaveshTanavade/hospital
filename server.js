import { app } from "./app.js";
import { connectToDB } from "./config/db.js";

try{
    const port = process.env.PORT || 3000;
    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    });
    connectToDB();    
}catch(err){
    console.log("Couldnot connect to server",err.message);
}