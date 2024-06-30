
///////////////////////////////////////////////////////////
//                                                       //
//      This file is for making the database connection. //
//                                                       //
///////////////////////////////////////////////////////////

import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config({ path: './.env' });


// The below function is for creating the database connection
const createDbConnection = async () => {
    try 
    {
        const dbConnection = await mongoose.connect(process.env.DB_URL);
        if (dbConnection) 
        {
            let message = "Successfully connected to the database"
            console.log(message);
        } else {
            let message = "Failed to connect to the database"
            console.log(message);
        }
    } catch (error) {
        console.log("Error while creating the database connection.", error.message);
    }
}


export { createDbConnection };
