export default class SorterConfig {
    id: number;
    label: string;
    functionName: string;

    constructor(id: number, label: string, functionName: string){
        this.id = id;
        this.label = label;
        this.functionName = functionName;
    }
} 