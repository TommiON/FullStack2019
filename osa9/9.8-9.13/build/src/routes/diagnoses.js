"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
var router = express_1.default.Router();
router.get('/', function (_req, res) {
    var response = diagnosesService_1.default.getEntries();
    res.send(response);
});
exports.default = router;
