import { simpleJson as Json } from "./simpleJson";

export class simpleDB {
    private fullPath: string;
    data: any;

    static New(filePath: string, initValue: any = {}) {
        return new simpleDB(filePath, initValue);
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
