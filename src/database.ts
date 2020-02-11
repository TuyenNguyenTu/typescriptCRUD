import mongoose from 'mongoose';

async function connect() {
    try 
    {
       await mongoose.connect('mongodb://localhost/dbTask',{
            useNewUrlParser:true
        });
        console.log("Server connected");
    } catch (error) {
        console.log("Error: "+error)
    }
}
export default connect;