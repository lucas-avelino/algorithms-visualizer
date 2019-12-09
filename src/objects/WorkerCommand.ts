// import Frame from "./Frame";
import Event from "./Event.js";
import SorterConfig from "./Sorter.js";

export interface SorterWorkerResponse {
    events: Event[];
    timeInExec: number;
    threadId: number;
}

export const Sorters: {[key: string]: SorterConfig} = {
    Bubble: new SorterConfig( 0, 'Bubble Sort', 'bubbleSort' ),
    Insertion: new SorterConfig( 1, 'Insertion Sort', 'insertionSort' ),
    Quick: new SorterConfig( 2, 'Quick Sort', 'quickSort' ),
    Merge: new SorterConfig( 3, 'Merge Sort', 'mergeSort')
}

export default class SorterWorkerCommand{
    threadId: number;
    typeOfCommand: SorterConfig;
    data: any[];
    constructor(threadId: number, typeOfCommand: SorterConfig, data: any[]){
        this.threadId = threadId;
        this.typeOfCommand  = typeOfCommand;
        this.data = data;
    }
}