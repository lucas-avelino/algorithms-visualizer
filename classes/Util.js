const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const SortList = {
    bubble:0,
    insertion:1,
    quick:2
}

const genRandomArray = (numOfElements,min = 10, max = 1000) => {
    let finalArray = [];
    for (let i = 0; i < numOfElements; i++) {
        let ret = 0;
        do { ret = Math.floor(Math.random() * max) + 1 } while(ret < min);
        finalArray.push(ret);
    }
    return finalArray;
}



export {SortList, genRandomArray};
export default sleep;