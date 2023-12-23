"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const server = (0, express_1.default)();
const serverPort = 3000;
server.use(express_1.default.static(path.join(__dirname, "public")));
;
let fleetRegistry = [];
server.use(express_1.default.json());
server.get("/greet", (req, res) => {
    res.send("Welcome to the Vehicle Registry API");
});
server.post("/vehicles", (req, res) => {
    const newVehicleData = req.body;
    const newVehicle = {
        model: newVehicleData.model,
        color: newVehicleData.color,
        manufactureYear: newVehicleData.manufactureYear,
        horsepower: newVehicleData.horsepower
    };
    if (newVehicleData.chassisType)
        newVehicle.chassisType = newVehicleData.chassisType;
    if (newVehicleData.numberOfWheels)
        newVehicle.numberOfWheels = newVehicleData.numberOfWheels;
    if (newVehicleData.draftCapacity)
        newVehicle.draftCapacity = newVehicleData.draftCapacity;
    if (newVehicleData.wingspanLength)
        newVehicle.wingspanLength = newVehicleData.wingspanLength;
    fleetRegistry.push(newVehicle);
    res.status(201).send({ message: "New vehicle registered", vehicle: newVehicle });
});
server.get("/vehicles/:model", (req, res) => {
    const searchModel = req.params.model;
    const foundVehicle = fleetRegistry.find(vehicle => vehicle.model === searchModel);
    if (foundVehicle) {
        res.json(foundVehicle);
    }
    else {
        res.status(404).send({ error: "Vehicle not found" });
    }
});
server.listen(serverPort, () => {
    console.log(`Vehicle Registry API is listening on port ${serverPort}`);
});
