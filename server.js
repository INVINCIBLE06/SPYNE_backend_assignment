/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//                 This is the starting file of the program.                           //
//                 All the library and other required thing we                         //
//                 are importing in the app.js and that app module we                  //
//                 are importing in this server.js file and run it to keep             //
//                 the start point clean and simple.                                   //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config({ path: './env/local.env' });
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
