import { red } from "colors";
import * as fs from "fs";
import * as path from "path";

export namespace SimpleJson {
    const FILE_EXT = ".json";

    export function formatPath(fullPath: string) {
        const dirname = path.dirname(fullPath);
        const basename = path.basename(fullPath);
        const ext = path.extname(fullPath);
        return { dirname: dirname, basename: basename, ext: ext };
    }

    export enum Initial {
        Object,
        List,
    }

    export function read(filePath: string) {
        filePath += ".json";
        //Not full path of .db.json (without filename)
        const rf = fs.readFileSync(filePath, "utf8");
        while (1) {
            try {
                const res = JSON.parse(rf); //역직렬화를 함
                return res; //실패 안 하면 그대로 리턴
            } catch (err) {
                //실패하면
                if (err) {
                    //JSON을 분석할 수 없음
                    console.log("[JSON] Can't parse the JSON-string. it seems has incorrect json format. :" + filePath + ".json");
                    console.log("[JSON] let me try fix it."); //파일이 비어있으면 빈 JSON을 씀
                    if (rf === "") fs.writeFileSync(filePath, "{}");
                    else {
                        //비어있지 않으면 길이에 따라서 값을 출력함
                        console.log("[JSON] It's failed to fix the problem automatically. the file is not empty :", rf.length > 20 ? red("TOO LONG!!") : rf);
                    }
                    return;
                }
            }
        }
    }

    export function write(filename: string, value: any): void {
        filename += FILE_EXT;
        fs.writeFileSync(filename, JSON.stringify(value, null, 4), "utf8");
    }

    //** filepath === C:/Users/daniel/example.db (by GetDataDir)
    //** dirname === C:/Users/daniel
    //** basename === example.db + ".json"

    /**
     *
     * @param filepath path of file, but without FILE EXTENSION
     * @param initValue value for init, { } or [ ]
     * @returns whether the file was created successfully
     */
    export function create(filepath: string, initValue: any = {}): boolean {
        filepath += FILE_EXT;

        const pth = formatPath(filepath);
        const dirname = pth.dirname;
        const basename = pth.basename;

        if (initValue === Initial.Object) initValue = {};
        else if (initValue === Initial.List) initValue = [];

        const dir = fs.readdirSync(dirname);
        if (!dir.includes(basename)) {
            fs.writeFileSync(filepath, JSON.stringify(initValue, null, 4));
            return true;
        }
        //already exists
        return false;
    }
}
