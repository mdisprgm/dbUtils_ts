import * as fs from "fs";
import * as path from "path";

export namespace simpleJson {
    export function formatPath(fullPath: string) {
        const dirname =  path.dirname(fullPath);
        const basename = path.basename(fullPath);
        return { dirname: dirname, basename: basename };
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
                    console.log(
                        "[JSON] Can't parse the json. it seems has incorrect json format. :" +
                            filePath +
                            ".json"
                    );
                    console.log("[JSON] let me try fix it."); //파일이 비어있으면 빈 JSON을 씀
                    if (rf === "") fs.writeFileSync(filePath, "{}");
                    else {
                        //비어있지 않으면 길이에 따라서 값을 출력함
                        console.log(
                            "[JSON] it's failed to fix the problem automatically. the file is not empty :",
                            rf.length > 20 ? "TOO LONG!!".red : rf
                        );
                    }
                    return;
                }
            }
        }
    }
    export function write(filePath: string, value: any): void {
        //Not full path of .db.json (without filename)
        filePath += ".json";
        fs.writeFileSync(filePath, JSON.stringify(value, null, 4), "utf8");
    }
    export function create(filePath: string, initValue: any = {}): boolean {
        //Not full path of .db.json (without filename)
        let init: any = {};
        const path_ = formatPath(filePath);
        const dirname = path_.dirname;
        const basename = path_.basename;

        if (initValue === Initial.List) init = [];
        const dir = fs.readdirSync(dirname);
        if (!dir.includes(basename + ".json")) {
            //fs.closeSync(fs.openSync(filePath, "w"));
            fs.writeFileSync(filePath, JSON.stringify(initValue, null, 4));
            return true;
        }
        //already exists
        return false;
    }
}
