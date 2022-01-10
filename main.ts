import { fsmgmt } from "../scriptUtils/fsmgmt";
import { fsutil } from "bdsx/fsutil";
import path = require("path");

const DATA_DIR = path.join(fsutil.projectPath, "scriptData");
fsmgmt.mkdirRecursiveSync(DATA_DIR, new Set<string>([fsutil.projectPath]));

export function GetDataDir(filepath: string) {
    const dirhas = new Set<string>([DATA_DIR]);
    fsmgmt.mkdirRecursiveSync(
        path.join(DATA_DIR, path.dirname(filepath)),
        dirhas
    );

    return path.join(DATA_DIR, filepath);
}
