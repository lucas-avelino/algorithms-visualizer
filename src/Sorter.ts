
// import sleep from './Util.js'
// import {SortList, CreateEvent, EventType} from './Util.js'
import tranformEventsInRenderFrames from './Render.js'

import Item from './objects/Item'
import Event from './objects/Event'
import Render from './Render'
import { EventType } from './objects/Event'


const SortList = {
    Bubble:     0,
    Insertion:  1,
    Quick:      2,
    Merge:      3
}


export class Sorter extends Render{
    array: Item[];
    eventPool: Event[] = [];
    timeInExec: number;

    constructor(element){
        super(element);
    }

    addEvent = async (eventType: number, data: {initialState: Item[], endState: Item[]}) =>{
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
                        // console.time("[add-event][118]");
                        this.timeInExec +=  performance.now();
                        this.addEvent(EventType.Movement, {initialState: arrayHoldedState, endState: {...this.array}});
                        arrayHoldedState = [...this.array];
                        this.timeInExec -=  performance.now();
                        // console.timeEnd("[add-event][118]");
                        i++;
                    }
                }
                const aux = this.array[i];
                this.array[i] = this.array[hi];
                this.array[hi] = aux;
                this.timeInExec +=  performance.now();
                this.addEvent(EventType.Movement, {initialState: arrayHoldedState, endState: {...this.array}});
                // console.time("[add-event][118]");
                this.timeInExec -=  performance.now();
                // console.timeEnd("[add-event][118]");
                // this.eventPool.push(CreateEvent(arrayHoldedState, {...this.array}, EventType.Movement));
                // arrayHoldedState = {...this.array};
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
        const merge = (leftArr: Item[], rightArr: Item[]) => {
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
            const mergeSortRecursive = (arr: Item[]) => {
            try {
                if (arr.length < 2) {
                    return arr; 
                }else {
                    var midpoint = Math.floor(arr.length / 2);
                    var leftArr   = arr.slice(0, midpoint) as Item[];
                    var rightArr  = arr.slice(midpoint, arr.length) as Item[];
                    
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

export default class SorterController extends Sorter{
    typeInExec: string;
    sort: () => SorterController;
    constructor(div, sort, array, framesPerSecond, element){
        super(element);

        super(framesPerSecond);
        this.element = div;
        
        switch(sort){
            case SortList.Bubble:
                this.typeInExec = "Bubble Sort";
                this.sort = this.bubbleSort;
                break;
            case SortList.Insertion:
                this.typeInExec = "Insertion Sort";
                this.sort = this.insertionSort;
                break;
            case SortList.Quick:
                this.typeInExec = "Quick Sort";
                this.sort = this.quickSort;
                break;
            case SortList.Merge:
                this.typeInExec = "Merge Sort";
                this.sort = this.mergeSort;
                break;
        }
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

    // //Attributes
    // renderFrames = [];
    // framesPerSecond = 25;
    // ms = 0;

    // //Function that starts render 
    // renderLoop = () => {
    //     this.renderLoopHandler = setInterval(async () => {this.render()}, 1000/this.framesPerSecond);
    // }

    // //Function that prepare render and transform the events into frames to be rendered
    // prepareRender = () => {
    //     this.ms = this.timeInExec * 1000;
    //     this.renderFrames = this.tranformEventsInRenderFrames(this.eventPool, this.framesPerSecond, this.ms || 1000);
    // }

    // //Function that render the first state of array
    // initialRender = async (typeInExec: string) => {
    //     const h = this.element.height();
    //     const colSize = 100 / this.array.length;
    //     const unitHSize = h/Math.max(...(this.array.map((a)=>a.value)));

    //     this.element.append(`<h4 style="color:white;position: absolute; top: 0; left: 2px;">${typeInExec}</h4>`);
    //     this.array.map((item,i) => {
    //         this.element.append(`<div val="${item.id}" class="bar-item bg-primary" style="color: white; order:${i}; height: ${unitHSize*item.value}px;width: ${colSize}%;"></div>`);
    //     });
    // }

    // //Function that are called by the render loop to render the next frame
    // render = async () => {
    //     if(this.renderFrames == null || this.renderFrames == [] || !this.renderFrames[0]) clearInterval(this.renderLoopHandler);
    //     const frame = this.renderFrames.shift();
    //     if(JSON.stringify(frame) != "{}"){
    //         for (const key in frame) {
    //             this.element.children(`.bar-item[val=${frame[key].id}]`).css({"order": key});
    //         }
    //     }
    // }
}