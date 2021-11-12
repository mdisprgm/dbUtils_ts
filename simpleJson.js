"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleJson = void 0;
const fs = require("fs");
var simpleJson;
(function (simpleJson) {
    function formatPath(fullPath) {
        const idx = fullPath.lastIndexOf("/");
        const path = fullPath.slice(0, idx + 1);
        const filename = fullPath.substr(idx + 1, fullPath.length);
        return { path: path, filename: filename };
    }
    simpleJson.formatPath = formatPath;
    let Initial;
    (function (Initial) {
        Initial[Initial["Object"] = 0] = "Object";
        Initial[Initial["List"] = 1] = "List";
    })(Initial = simpleJson.Initial || (simpleJson.Initial = {}));
    function read(filePath) {
        filePath += ".json";
        //Not full path of .db.json (without filename)
        const rf = fs.readFileSync(filePath, "utf8");
        while (1) {
            try {
                const res = JSON.parse(rf); //역직렬화를 함
                return res; //실패 안 하면 그대로 리턴
            }
            catch (err) {
                //실패하면
                if (err) {
                    //JSON을 분석할 수 없음
                    console.log("[JSON] Can't parse the json. it seems has incorrect json format. :" +
                        filePath +
                        ".json");
                    console.log("[JSON] let me try fix it."); //파일이 비어있으면 빈 JSON을 씀
                    if (rf === "")
                        fs.writeFileSync(filePath, "{}");
                    else {
                        //비어있지 않으면 길이에 따라서 값을 출력함
                        console.log("[JSON] it's failed to fix the problem automatically. the file is not empty :", rf.length > 20 ? "TOO LONG!!".red : rf);
                    }
                    return;
                }
            }
        }
    }
    simpleJson.read = read;
    function write(filePath, value) {
        //Not full path of .db.json (without filename)
        filePath += ".json";
        fs.writeFileSync(filePath, JSON.stringify(value), "utf8");
    }
    simpleJson.write = write;
    function create(filePath, initValue = {}) {
        //Not full path of .db.json (without filename)
        let init = {};
        const formattedPath = formatPath(filePath);
        const pathWithoutFilename = formattedPath.path;
        const file = formattedPath.filename;
        if (initValue === Initial.List)
            init = [];
        const dir = fs.readdirSync(pathWithoutFilename);
        if (!dir.includes(file + ".json")) {
            //fs.closeSync(fs.openSync(filePath, "w"));
            fs.writeFileSync(filePath, JSON.stringify(initValue));
        }
    }
    simpleJson.create = create;
})(simpleJson = exports.simpleJson || (exports.simpleJson = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlSnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbXBsZUpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQTBCO0FBRTFCLElBQWlCLFVBQVUsQ0E0RDFCO0FBNURELFdBQWlCLFVBQVU7SUFDdkIsU0FBZ0IsVUFBVSxDQUFDLFFBQWdCO1FBQ3ZDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFMZSxxQkFBVSxhQUt6QixDQUFBO0lBQ0QsSUFBWSxPQUdYO0lBSEQsV0FBWSxPQUFPO1FBQ2YseUNBQU0sQ0FBQTtRQUNOLHFDQUFJLENBQUE7SUFDUixDQUFDLEVBSFcsT0FBTyxHQUFQLGtCQUFPLEtBQVAsa0JBQU8sUUFHbEI7SUFDRCxTQUFnQixJQUFJLENBQUMsUUFBZ0I7UUFDakMsUUFBUSxJQUFJLE9BQU8sQ0FBQztRQUNwQiw4Q0FBOEM7UUFDOUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLEVBQUU7WUFDTixJQUFJO2dCQUNBLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUNyQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQjthQUMvQjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLE1BQU07Z0JBQ04sSUFBSSxHQUFHLEVBQUU7b0JBQ0wsZ0JBQWdCO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUNQLG9FQUFvRTt3QkFDaEUsUUFBUTt3QkFDUixPQUFPLENBQ2QsQ0FBQztvQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxxQkFBcUI7b0JBQy9ELElBQUksRUFBRSxLQUFLLEVBQUU7d0JBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQzNDO3dCQUNELHlCQUF5Qjt3QkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FDUCw4RUFBOEUsRUFDOUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDekMsQ0FBQztxQkFDTDtvQkFDRCxPQUFPO2lCQUNWO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUE5QmUsZUFBSSxPQThCbkIsQ0FBQTtJQUNELFNBQWdCLEtBQUssQ0FBQyxRQUFnQixFQUFFLEtBQVU7UUFDOUMsOENBQThDO1FBQzlDLFFBQVEsSUFBSSxPQUFPLENBQUM7UUFDcEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBSmUsZ0JBQUssUUFJcEIsQ0FBQTtJQUNELFNBQWdCLE1BQU0sQ0FBQyxRQUFnQixFQUFFLFlBQWlCLEVBQUU7UUFDeEQsOENBQThDO1FBQzlDLElBQUksSUFBSSxHQUFRLEVBQUUsQ0FBQztRQUNuQixNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9DLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxTQUFTLEtBQUssT0FBTyxDQUFDLElBQUk7WUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEVBQUU7WUFDL0IsMkNBQTJDO1lBQzNDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUN6RDtJQUNMLENBQUM7SUFaZSxpQkFBTSxTQVlyQixDQUFBO0FBQ0wsQ0FBQyxFQTVEZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUE0RDFCIn0=