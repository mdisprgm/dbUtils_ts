import { simpleJson as Json } from "./simpleJson";

export class simpleDB {
    private fullPath: string;
    data: any;

    static New(filePath: string, initValue: any = {}) {
        return new simpleDB(filePath);
    }

    constructor(filePath: string, initValue: any = {}) {
        this.fullPath = filePath;
        Json.create(filePath);
        this.data = Json.read(filePath);
    }
    write(value: any) {
        Json.write(this.fullPath, value);
    }
    update() {
        this.write(this.data);
    }
}
