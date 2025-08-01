import { ItemCategory } from "./IItem";

export class Toy {
    private type: string;
    private ageGroup: string;
    private brand: string;
    private material: string;
    private batteryRequired: boolean;
    private educational: boolean;
    
    constructor(
        type: string,
        ageGroup: string,
        brand: string,
        material: string,
        batteryRequired: boolean,
        educational: boolean
    ) {
        this.type = type;
        this.ageGroup = ageGroup;
        this.brand = brand;
        this.material = material;
        this.batteryRequired = batteryRequired;
        this.educational = educational;
    }
    getCategory(): ItemCategory {
        return ItemCategory.TOY;
    }
    // Getters for the properties
    getType(): string {
        return this.type;
    }
    getAgeGroup(): string {
        return this.ageGroup;
    }
    getBrand(): string {
        return this.brand;
    }
    getMaterial(): string {
        return this.material;
    }
    isBatteryRequired(): boolean {
        return this.batteryRequired;
    }
    isEducational(): boolean {
        return this.educational;
    }
}