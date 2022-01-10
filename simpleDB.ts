import { fsmgmt } from "../scriptUtils/fsmgmt";
import { fsutil } from "bdsx/fsutil";
import { SipmleJson as Json } from "./simpleJson";
import path = require("path");

export class SimpleDB {
    private fullPath: string;
    data: any;

    static readonly DATA_DIR = path.join(fsutil.projectPath, "datas");

    static New(filePath: string, initValue: any = {}) {
        return new SimpleDB(filePath, initValue);
    }

    static GetDirPath(filepath: string) {
        const dirhas = new Set<string>([this.DATA_DIR]);
        fsmgmt.mkdirRecursiveSync(
            path.join(this.DATA_DIR, path.dirname(filepath)),
            dirhas
        );

        return path.join(this.DATA_DIR, filepath);
    }

    private constructor(filePath: string, initValue: any = {}) {
        this.fullPath = filePath;
        Json.create(filePath, initValue);
        this.data = Json.read(filePath);
    }
    write(value: any) {
        Json.write(this.fullPath, value);
    }
    update() {
        this.write(this.data);
    }
}

fsmgmt.mkdirRecursiveSync(
    SimpleDB.DATA_DIR,
    new Set<string>([fsutil.projectPath])
);
