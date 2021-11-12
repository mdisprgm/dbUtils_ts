import { simpleJson as Json } from "./simpleJson";

export class simpleDB {
    private fullPath: string;

    static New(filePath: string, initValue: any = {}) {
        return new simpleDB(filePath);
    }

    constructor(filePath: string, initValue: any = {}) {
        this.fullPath = filePath;
        Json.create(filePath);
    }
    write(value: any) {
        Json.write(this.fullPath, value);
    }
    upadte() {
        this.write(this.data);
    }
    get data() {
        return Json.read(this.fullPath);
    }
}
