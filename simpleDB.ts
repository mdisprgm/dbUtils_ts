import { fsutil } from "bdsx/fsutil";
import { fsmgmt } from "../scriptUtils/fsmgmt";
import { SipmleJson as Json } from "./simpleJson";

import path = require("path");
import fs = require("fs");
import ini = require("ini");

const fIni = fs.readFileSync("dbUtils/sub_path.ini", "utf8");
const DATA_PATH = ini.parse(fIni)["path"];

interface Class {
    new (...args: any[]): any;
}

export class SimpleDB<T = any> {
    protected fullPath: string;
    data: T;

    static readonly DATA_DIR = path.join(fsutil.projectPath, DATA_PATH);

    static New<T = any>(filePath: string, initValue: any = {}): SimpleDB<T> {
        if (["/", "\\"].includes(filePath[filePath.length - 1])) throw new Error("Can't extract filename");
        return new SimpleDB<T>(filePath, initValue);
    }

    static GetDirPath(filepath: string): string {
        const dirhas = new Set<string>([this.DATA_DIR]);
        fsmgmt.mkdirRecursiveSync(path.join(this.DATA_DIR, path.dirname(filepath)), dirhas);

        return path.join(this.DATA_DIR, filepath);
    }

    static prepare(): void {
        fsmgmt.mkdirRecursiveSync(SimpleDB.DATA_DIR, new Set<string>([fsutil.projectPath]));
    }

    protected constructor(filePath: string, initValue: any = {}) {
        this.fullPath = filePath;
        Json.create(filePath, initValue);
        this.data = Json.read(filePath);
    }

    /** Changes {@link data} also, forcibly */
    write(value: T): void {
        this.data = value;
        Json.write(this.fullPath, value);
    }

    update(): void {
        this.write(this.data);
    }

    setPrototypes(baseClass: Class): void {
        if (Array.isArray(this.data)) {
            for (const elm of this.data) {
                Object.setPrototypeOf(elm, baseClass.prototype);
            }
        } else {
            Object.setPrototypeOf(this.data, baseClass.prototype);
        }
    }
}

SimpleDB.prepare();
