
import sleep from './Util.js'
import {SortList} from './Util.js'

export class Sorter{

    constructor(){
        setInterval(()=>{this.renderAsync()},0.25);
    }

    setArray = (array) =>{
        this.array = array;
    }

    render = (a,b,c) => {} 

    ordered = false;

    renderPool = [
        
    ]

    bubbleSort = async () => {
        try {
            for (let i = 0; i < this.array.length; i++) {

                for(let j = 0; j < this.array.length-i; j++){
                    if( this.array[i] && this.array[j+1] && this.array[j].value > this.array[j+1].value){
                        const aux = this.array[j];
                        this.array[j] = this.array[j+1];
                        this.array[j+1] = aux;
                    }
                    await this.render(this.array, [i], [j+1]);
                }
            }
        } catch (error) {
            return;
        }
        await this.render(this.array);
    } 

    insertionSort = async () => {
        try {
            for (let i = 0; i < this.array.length; i++) {
                const key = this.array[i]; 
                let j = i - 1; 
                while (j >= 0 && this.array[j].value > key.value) { 
                    this.array[j + 1] = this.array[j]; 
                    j = j - 1; 
                    await this.render(this.array, i, j);
                }
                this.array[j + 1] = key; 
            }
        } catch (error) {
            return;
        }
        this.render(this.array);
    }

    quickSort = async () => {
        try {
            const quick = async (array, lo, hi) => {
                if(lo < hi){
                    let p = await particiona(array, lo, hi)
                    // await sleep(1);
                    await quick(array, lo, p - 1)
                    await quick(array, p + 1, hi)
                }
                // console.log("end aaa")
            }
            const particiona = async (array, lo, hi) => {
                let pivot = array[hi];
                let i = lo;
                for (let j = lo; j <= hi; j++) {
                    if(array[j].value < pivot.value){
                        const aux = this.array[i];
                        this.array[i] = this.array[j];
                        this.array[j] = aux;
                        i++;
                    }
                    this.renderPool.push({time: Date.now(), array: [...this.array]});
                    // await this.render(this.array, i, j);
                }
                
                const aux = this.array[i];
                this.array[i] = this.array[hi];
                this.array[hi] = aux;
                this.renderPool.push({time: Date.now(), array: this.array});
                
                return i
            }
            // setInterval(console.log("A"),100)
            // let repeatHandler = setInterval(() => {
            //     // this.renderAsync(this.array);
            //     console.log("oi");
            // }, .5);
            console.log(Date.now());
            await quick(this.array, 0, this.array.length-1);
            console.log(Date.now());
            // console.log(this.renderPool);
            // console.log("aaa")
            // setTimeout(() => {clearInterval(repeatHandler)},10000)
        } catch (error) {
            return;
        }
        // this.render(this.array);
        
    }

    mergeSort = async () => {
        const merge = (leftArr, rightArr) => {
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
            this.render(sortedArr);
            return sortedArr;
        }
        const mergeSortRecursive = (arr) => {
            if (arr.length < 2) {
                return arr; 
            }else {
                var midpoint = parseInt(arr.length / 2);
                var leftArr   = arr.slice(0, midpoint);
                var rightArr  = arr.slice(midpoint, arr.length);
                return merge(mergeSortRecursive(leftArr), mergeSortRecursive(rightArr));
            }
        }
        
        mergeSortRecursive(this.array);
    }
}

export default class SorterController extends Sorter{
    constructor(div, sort, array){
        super();
        this.element = div;
        switch(sort){
            case SortList.bubble:
                this.typeInExec = "Bubble Sort";
                this.sort = this.bubbleSort;
                break;
            case SortList.insertion:
                this.typeInExec = "Insertion Sort";
                this.sort = this.insertionSort;
                break;
            case SortList.quick:
                this.typeInExec = "Quick Sort";
                this.sort = this.quickSort;
                break;
            case SortList.merge:
                this.typeInExec = "Merge Sort";
                this.sort = this.mergeSort;
                break;
        }
        this.array = array;
        this.initialRender();
    }

    cancel = () => {
        this.array = null;
        this.renderPool = [];
    }

    initialRender = async () => {
        const h = this.element.height();
        // const w = this.element.width();
        const colSize = 100 / this.array.length;
        const unitHSize = h/Math.max(...(this.array.map((a)=>a.value)));
        this.element.append(`<h4 style="color:white;position: absolute; top: 0; left: 2px;">${this.typeInExec}</h4>`);
        this.array.map((item,i) => {
            this.element.append(`<div val="${item.id}" class="bar-item bg-primary" style="color: white; order:${i}; height: ${unitHSize*item.value}px;width: ${colSize}%;"></div>`);
        });
    }

    renderAsync = async (lista, componenteAtual = -1, comparedElement = -1) => {
        if(this.renderPool.length == 0) return 0;
        const frame = this.renderPool.shift();
        // console.log(this.renderPool, frame);
        // // await sleep(1);
        // $(".bar-item.bg-danger").map((i,item)=>{
        //     $(item).removeClass("bg-danger");
        // });
        // $(".bar-item.bg-secondary").map((i,item)=>{
        //     $(item).removeClass("bg-secondary");
        // })

        frame.array.map((item,i) => {
            this.element.children(`.bar-item[val=${item.id}]`).css({"order": i});
            if(i == componenteAtual){
                this.element.children(`.bar-item[val=${item.id}]`).addClass("bg-danger");
            }else if(i == comparedElement){
                this.element.children(`.bar-item[val=${item.id}]`).addClass("bg-secondary");
            }
        });

    }

    render = async (lista, componenteAtual = -1, comparedElement = -1) => {
        await sleep(1);
        $(".bar-item.bg-danger").map((i,item)=>{
            $(item).removeClass("bg-danger");
        });
        $(".bar-item.bg-secondary").map((i,item)=>{
            $(item).removeClass("bg-secondary");
        })

        lista.map((item,i) => {
            this.element.children(`.bar-item[val=${item.id}]`).css({"order": i});
            if(i == componenteAtual){
                this.element.children(`.bar-item[val=${item.id}]`).addClass("bg-danger");
            }else if(i == comparedElement){
                this.element.children(`.bar-item[val=${item.id}]`).addClass("bg-secondary");
            }
        });

    }
    
}