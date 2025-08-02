import { Toy } from "model/toy.model";
import { IMapper } from "./IMapper";
import { ToyBuilder } from "../model/builders/toy.builder";


export class XMLToyMapper implements IMapper<string[], Toy> {
    map(data: string[]): Toy {
        const batteryRequired = data[5].toLowerCase() === "yes";
        const educational = data[6].toLowerCase() === "yes";
        return ToyBuilder.newBuilder()
                        .setType(data[1])
                        .setAgeGroup(data[2])
                        .setBrand(data[3])
                        .setMaterial(data[4])
                        .setBatteryRequired(batteryRequired)
                        .setEducational(educational)
                        .build();
    }
    
}