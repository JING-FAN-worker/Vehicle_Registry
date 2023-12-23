import express, { Application, Request, Response } from 'express';
import * as path from 'path';

const server: Application = express();
const serverPort: number = 3000;
server.use(express.static(path.join(__dirname, "public")));
interface IVehicle {
    model: string;
    color: string;
    manufactureYear: number;
    horsepower: number;
    chassisType ?: string;
    numberOfWheels ?: number;
    draftCapacity ?: number;
    wingspanLength ?: number;
};

type Fleet = IVehicle[];
let fleetRegistry: Fleet = [];

server.use(express.json());

server.get("/greet", (req: Request, res: Response) => {
    res.send("Welcome to the Vehicle Registry API");
});

server.post("/vehicles", (req: Request, res: Response) => {
    const newVehicleData = req.body;
    const newVehicle: IVehicle = {
        model: newVehicleData.model,
        color: newVehicleData.color,
        manufactureYear: newVehicleData.manufactureYear,
        horsepower: newVehicleData.horsepower
    };

    if (newVehicleData.chassisType) newVehicle.chassisType = newVehicleData.chassisType;
    if (newVehicleData.numberOfWheels) newVehicle.numberOfWheels = newVehicleData.numberOfWheels;
    if (newVehicleData.draftCapacity) newVehicle.draftCapacity = newVehicleData.draftCapacity;
    if (newVehicleData.wingspanLength) newVehicle.wingspanLength = newVehicleData.wingspanLength;

    fleetRegistry.push(newVehicle);
   
    
    
    res.status(201).send({ message: "New vehicle registered", vehicle: newVehicle });
});

server.get("/vehicles/:model", (req: Request, res: Response) => {
    const searchModel: string = req.params.model;
    const foundVehicle = fleetRegistry.find(vehicle => vehicle.model === searchModel);

    if (foundVehicle) {
        res.json(foundVehicle);
    } else {
        res.status(404).send({ error: "Vehicle not found" });
    }
});

server.listen(serverPort, () => {
    console.log(`Vehicle Registry API is listening on port ${serverPort}`);
});
