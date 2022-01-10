import { fsmgmt } from "../hslib/modules/fsmgmt";
import { fsutil } from "bdsx/fsutil";
import path = require("path");

const DATA_DIR = path.join(fsutil.projectPath, "data");
fsmgmt.mkdirRecursiveSync(DATA_DIR, new Set<string>([fsutil.projectPath]));

export function GetDataDir(filepath: string) {
    const dirhas = new Set<string>([DATA_DIR]);
    fsmgmt.mkdirRecursiveSync(
        path.join(DATA_DIR, path.dirname(filepath)),
        dirhas
    );

    return path.join(DATA_DIR, filepath);
}
