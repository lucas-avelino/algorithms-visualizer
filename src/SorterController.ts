
import Item from './objects/Item.js'
import Event from './objects/Event.js'
import Render from './Render.js'
import { EventType } from './objects/Event.js'
import SorterConfig from './objects/Sorter.js'


export const Sorters: {[key: string]: SorterConfig} = {
    Bubble: new SorterConfig ( 0, 'Bubble Sort', 'bubbleSort' ),
    Insertion: new SorterConfig( 1, 'Insertion Sort', 'insertionSort' ),
    Quick: new SorterConfig( 2, 'Quick Sort', 'quickSort' ),
    Merge: new SorterConfig( 3, 'Merge Sort', 'mergeSort')
}

export class SorterLogic extends Render{
    array: Array<Item> = [];
    eventPool: Array<Event> = [];
    timeInExec: number = 0;

    constructor(element: JQuery){
        super(element);
    }

    addEvent = async (eventType: number, data: {initialState: Array<Item>, endState: Array<Item>}) =>{
        this.eventPool.push(new Event(eventType, data));
    }

    bubbleSort = () => {
        this.timeInExec = - performance.now();
        try {
            let arrayHoldedState = [...this.array];
            for (let i = 0; i < this.array.length; i++) {
                for(let j = 0; j < this.array.length-i; j++){
                    if( this.array[i] && this.array[j+1] && this.array[j].value > this.array[j+1].value){
                        const aux = this.array[j];
                        this.array[j] = this.array[j+1];
                        this.array[j+1] = aux;
                        this.addEvent(EventType.Movement, {initialState: arrayHoldedState, endState: {...this.array}});
                    }
                    arrayHoldedState = [...this.array];
                }
            }
        } catch (error) {
            return;
        }
        // await this.render(this.array);
        this.timeInExec +=  performance.now();
        this.prepareRender(this.eventPool);
        return this;
    } 

    insertionSort = () => {
        let insertion = () => {
            try {
                for (let i = 0; i < this.array.length; i++) {
                    const key = this.array[i];
                    let arrayHoldedState = [...this.array];
                    let j = i - 1;
                    while (j >= 0 && this.array[j].value > key.value) { 
                        this.array[j + 1] = this.array[j]; 
                        j = j - 1; 
                        this.addEvent(EventType.Movement, {initialState: arrayHoldedState, endState: {...this.array}});
                        arrayHoldedState = [...this.array];
                    }
                    this.array[j + 1] = key; 
                    this.addEvent(EventType.Movement, {initialState: arrayHoldedState, endState: {...this.array}});
                    arrayHoldedState = [...this.array];
                }
            } catch (error) {
                return;
            }
        }
        this.timeInExec = - performance.now();
        insertion();
        this.timeInExec +=  performance.now();
        this.prepareRender(this.eventPool);
        return this;
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
        return this;
    }
}

export default class SorterController extends SorterLogic{
    typeInExec: string = "";
    sort: () => any;


    constructor(div: JQuery, sort: SorterConfig, array: Array<Item>, framesPerSecond){
        super(div);
        this.typeInExec = sort.label;
        this.sort = this[sort.functionName];

        this.array = array;
        this.timeInExec = 0;
        this.framesPerSecond = framesPerSecond;
        this.initialRender(this.array, this.typeInExec);
        
    }

    cancel = () => {
        clearInterval(this.renderLoopHandler);
        this.array = null;
        this.eventPool = [];
    }

}