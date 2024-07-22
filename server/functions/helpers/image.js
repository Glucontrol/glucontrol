const fs = require('fs');

// Helper function
function base64_encode(file) {
    return "data:image/gif;base64," + fs.readFileSync(file, 'base64');
}
var base64str = base64_encode('./src/helpers/logoedit.jpg');
const buffer = Buffer.from(base64str, "base64");
fs.writeFileSync("new-path.jpg", buffer);
console.log(buffer);