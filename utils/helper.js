import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The function is universal function. Which will check whether the value entered or not. We can use this function any where in the whole code.
const checkValueEntered = (fieldName, messageField) => (req, res, next) => {
    return new Promise((resolve, reject) => {
        if (!fieldName || fieldName?.length === 0 || fieldName.trim() === "") {
            return res.status(200).send({
                code: 400,
                status: false,
                message: `${messageField} not entered`,
            });
        } else {
            resolve();
        }
    });
};

// The below function is for file upload. 
const fileUpload = async (attachments) => {
    let path = join(__dirname, '../post/');
    return new Promise((resolve, reject) => {
        if (!attachments) {
            resolve('NOATTACHEMENT')
        } else {
            let fileExtension = attachments.name.split('.').pop().toLowerCase(); // get the file extension
            if (['png', 'jpg', "pdf", "jpeg", "docx"].includes(fileExtension)) {
                let randomNumber = Math.floor(Math.random() * 1000000); // generate random number
                let filename = `${randomNumber}_${attachments.name}`; // use current date, random number and original file name to create a unique file name
                let uploadPath = path +filename
                attachments.mv(uploadPath, (err) => {
                    err ? resolve('ERR') : resolve(uploadPath);
                });                
            } else {
                resolve('INVALIDFORMAT')
            }
        }
    });
}


export { checkValueEntered, fileUpload }