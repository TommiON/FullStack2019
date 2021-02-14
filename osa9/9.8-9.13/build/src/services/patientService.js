"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var patients_json_1 = __importDefault(require("../../data/patients.json"));
var getEntries = function () {
    return patients_json_1.default.map(function (_a) {
        var id = _a.id, name = _a.name, occupation = _a.occupation, gender = _a.gender, dateOfBirth = _a.dateOfBirth;
        return ({
            id: id,
            name: name,
            occupation: occupation,
            gender: gender,
            dateOfBirth: dateOfBirth
        });
    });
};
exports.default = { getEntries: getEntries };
