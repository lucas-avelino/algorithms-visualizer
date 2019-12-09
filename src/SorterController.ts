
import Item from './objects/Item.js'
import Event from './objects/Event.js'
import Render from './Render.js'
import SorterConfig from './objects/Sorter.js'
import SorterWorkerCommand, { SorterWorkerResponse } from './objects/WorkerCommand.js'

export enum Status{
    Builded,
    WaitingWorker,
    WaitingRender
}
export default class SorterController extends Render{
    typeInExec: string = "";
    worker: Worker;
    config: SorterConfig;
    threadId: number;
    status: Status;
    // timeInExec: number = 1000;
    eventPool: Event[] = [];
    array: Item[];

    constructor(div: JQuery, config: SorterConfig, array: Array<Item>, framesPerSecond: number, threadId:number){
        super(div);
        this.config = config;
        this.worker = new Worker("./publish/SorterWorker.js", { type: "module" });
        this.worker.onmessage = this.sortDone;
        this.threadId = threadId;
        this.array = array;
        this.initialRender(array, config.label);


    addEvent = async (eventType: number, data: {initialState: Array<Item>, endState: Array<Item>}) =>{
        this.eventPool.push(new Event(eventType, data));
    }

    sort = () => {
        this.worker.postMessage(
            JSON.stringify(
                new SorterWorkerCommand(this.threadId, this.config, this.array)
            )
        );
        this.status = Status.WaitingWorker;
    }

    quickSort = () => {
        try {
            const quick = (lo, hi) => {
                if(lo < hi){
                    let p = particiona(lo, hi)
                    quick(lo, p - 1)
                    quick(p + 1, hi)
                }
            }
            const particiona = (lo, hi) => {
                let pivot = this.array[hi];
                this.timeInExec +=  performance.now();
                let arrayHoldedState = {...this.array};
                this.timeInExec -=  performance.now();
                let i = lo;
                for (let j = lo; j <= hi; j++) {
                    if(this.array[j].value < pivot.value){
                        const aux = this.array[i];
                        this.array[i] = this.array[j];
                        this.array[j] = aux;
                        this.timeInExec +=  performance.now();
                        this.addEvent(EventType.Movement, {initialState: arrayHoldedState, endState: {...this.array}});
                        arrayHoldedState = [...this.array];
                        this.timeInExec -=  performance.now();
                        i++;
                    }
                }
                const aux = this.array[i];
                this.array[i] = this.array[hi];
                this.array[hi] = aux;
                this.timeInExec +=  performance.now();
                this.addEvent(EventType.Movement, {initialState: arrayHoldedState, endState: {...this.array}});
                this.timeInExec -=  performance.now();
                return i
            }
            this.timeInExec -=  performance.now();
            quick(0, this.array.length-1);
            this.timeInExec +=  performance.now();
        } catch (error) {
            return this;
        }
        this.prepareRender(this.eventPool);
        return this;
    }

    mergeSort = () => {
        const merge = (leftArr: Array<Item>, rightArr: Array<Item>) => {
            var sortedArr = [];

            while (leftArr.length && rightArr.length) {
                if (leftArr[0].value <= rightArr[0].value) {
                    sortedArr.push(leftArr[0]);
                    leftArr = leftArr.slice(1)
                } else {
                    sortedArr.push(rightArr[0]);
                    rightArr = rightArr.slice(1)
                }
            }
            while (leftArr.length)
                sortedArr.push(leftArr.shift());
            while (rightArr.length)
                sortedArr.push(rightArr.shift());
            
                return sortedArr;
            }
            const mergeSortRecursive = (arr: Array<Item>) => {
            try {
                if (arr.length < 2) {
                    return arr; 
                }else {
                    var midpoint = Math.floor(arr.length / 2);
                    var leftArr   = arr.slice(0, midpoint) as Array<Item>;
                    var rightArr  = arr.slice(midpoint, arr.length) as Array<Item>;
                    
                    let a = merge(mergeSortRecursive(leftArr), mergeSortRecursive(rightArr)); 
                    this.addEvent(EventType.Movement,{initialState: arr, endState: a});
                    arr = a;
                    return a;
                }
            } catch (error) {
                    
            }
        }
        this.timeInExec -=  performance.now();
        mergeSortRecursive(this.array);
        this.timeInExec +=  performance.now();
        this.prepareRender(this.eventPool);
        this.status = Status.WaitingRender;
        console.log(this);
        this.worker.terminate();
    }

    cancel = () => {
        this.worker.terminate();
        //clearInterval(this.renderLoopHandler);
    }

}