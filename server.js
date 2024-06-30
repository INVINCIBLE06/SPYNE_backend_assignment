import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config({ path: './env/local.env' });
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});