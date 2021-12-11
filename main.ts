import fs = require("fs");
const DATA_DIR = "../data";
export function GetDataDir(filepath: string) {
    return DATA_DIR + "/" + filepath;
}

try {
    const dataDirExists = fs.existsSync(DATA_DIR);
    if (!dataDirExists) {
        fs.mkdirSync(DATA_DIR);
    }
} catch (err) {
    console.log(`Error while making directory > ${DATA_DIR} :`, err);
    process.exit(1);
}
