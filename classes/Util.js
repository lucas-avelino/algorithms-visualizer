const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const SortList = {
    bubble:     0,
    insertion:  1,
    quick:      2,
    merge:      3
}

const genRandomArray = (numOfElements,min = 10, max = 1000) => {
    let finalArray = [];
    for (let i = 0; i < numOfElements; i++) {
        let ret = 0;
        do { ret = Math.floor(Math.random() * max) + 1 } while(ret < min);
        finalArray.push({value: ret,id: i});
    }
    return finalArray;
}

const arrayDiff = (left, right) => {
    const qtdElements = left.length;
    let diff = [];
    // console.log("aa:; ",left, right);
    for (let i = 0; i < qtdElements; i++) {
        // console.log( i, left[i], right[i], left[i] == right[i]);
        if(left[i] != right[i]){
            diff.push(left[i]);
        }else{
            diff.push(null);
        }
    }
    // console.log(diff)
    return diff;
}

export {SortList, genRandomArray, arrayDiff};
export default sleep;