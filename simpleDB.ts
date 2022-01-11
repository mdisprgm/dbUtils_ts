import { fsmgmt } from "../hslib/modules/fsmgmt";
import { fsutil } from "bdsx/fsutil";
import { SipmleJson as Json } from "./simpleJson";

import path = require("path");
import fs = require("fs");
import ini = require("ini");

const fIni = fs.readFileSync("dbUtils/sub_path.ini", "utf8");
const DATA_PATH = ini.parse(fIni)["path"];

export class SimpleDB<T = any> {
    private fullPath: string;
    data: T;

    static readonly DATA_DIR = path.join(fsutil.projectPath, DATA_PATH);

    static New<T = any>(filePath: string, initValue: any = {}) {
        if (["/", "\\"].includes(filePath[filePath.length - 1]))
            throw new Error("Can't extract filename");
        return new SimpleDB<T>(filePath, initValue);
    }

    static GetDirPath(filepath: string) {
        const dirhas = new Set<string>([this.DATA_DIR]);
        fsmgmt.mkdirRecursiveSync(
            path.join(this.DATA_DIR, path.dirname(filepath)),
            dirhas
        );

        return path.join(this.DATA_DIR, filepath);
    }

    static prepare() {
        fsmgmt.mkdirRecursiveSync(
            SimpleDB.DATA_DIR,
            new Set<string>([fsutil.projectPath])
        );
    }

    protected constructor(filePath: string, initValue: any = {}) {
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

SimpleDB.prepare();
