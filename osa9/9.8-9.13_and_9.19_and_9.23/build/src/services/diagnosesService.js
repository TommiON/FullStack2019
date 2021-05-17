"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var diagnoses_json_1 = __importDefault(require("../../data/diagnoses.json"));
var getEntries = function () {
    return diagnoses_json_1.default;
};
exports.default = { getEntries: getEntries };
