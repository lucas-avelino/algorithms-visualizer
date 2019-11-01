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

const CreateEvent = (initialState, endState) => {
    let diff = {};
    for (const key in initialState) {
        if(initialState[key] != endState[key]){
            diff[key] = endState[key];
        }
    }
    return diff;
}

// Object.prototype.equals = function(x)
// {
//     for(p in this)
//     {
//         switch(typeof(this[p]))
//         {
//             case 'object':
//                 if (!this[p].equals(x[p])) { return false }; break;
//             case 'function':
//                 if (typeof(x[p])=='undefined' || (p != 'equals' && this[p].toString() != x[p].toString())) { return false; }; break;
//             default:
//                 if (this[p] != x[p]) { return false; }
//         }
//     }

//     for(p in x)
//     {
//         if(typeof(this[p])=='undefined') {return false;}
//     }

//     return true;
// }

export {SortList, genRandomArray, CreateEvent};
export default sleep;