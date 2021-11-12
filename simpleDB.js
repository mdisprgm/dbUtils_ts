"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleDB = void 0;
const simpleJson_1 = require("./simpleJson");
class simpleDB {
    constructor(filePath, initValue = {}) {
        this.fullPath = filePath;
        simpleJson_1.simpleJson.create(filePath);
    }
    static New(filePath, initValue = {}) {
        return new simpleDB(filePath);
    }
    write(value) {
        simpleJson_1.simpleJson.write(this.fullPath, value);
    }
    upadte() {
        this.write(this.data);
    }
    get data() {
        return simpleJson_1.simpleJson.read(this.fullPath);
    }
}
exports.simpleDB = simpleDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlREIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGVEQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBa0Q7QUFFbEQsTUFBYSxRQUFRO0lBT2pCLFlBQVksUUFBZ0IsRUFBRSxZQUFpQixFQUFFO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLHVCQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFQRCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQWdCLEVBQUUsWUFBaUIsRUFBRTtRQUM1QyxPQUFPLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFNRCxLQUFLLENBQUMsS0FBVTtRQUNaLHVCQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELE1BQU07UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ0osT0FBTyx1QkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBcEJELDRCQW9CQyJ9