import crypto from "crypto"
import fs from "fs"

const generateHashImage=(imagePath)=>{
    //Returns the contents of the path.
const fileBuffer=fs.readFileSync(imagePath);
const hash=crypto.createHash("sha256");
hash.update(fileBuffer);
//the final hash value, encoded as a readable hexadecimal string
return hash.digest("hex");

}

export default generateHashImage