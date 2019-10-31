const mergeEvents = (events) => {
    if(events.length == 0){ return null }
    const numberOfElements = events.length;
    let array = [...events[0]];
    if(array == undefined){
        return null;
    }
    const sizeOfArray = array.length;
    for (let i = 1; i < numberOfElements; i++) {
        for (let j = 0; j < sizeOfArray; j++) {
            if (events[i][j] != null) {
                // console.log(array[j]);
                array[j] = events[i][j]; 
            }
        }
    }
    // console.log("merge",events.filter(
    //         (e) =>e.array.filter(
    //             (i) => i!=null
    //         ).length > 1
    //     ),
    //     array.filter(
    //         (e)=> e!=null)
    //     );
    // console.log(array);
    return array;
}

const tranformEventsInRenderFrames = (eventPool, frameRate, sizeOfAnimation) => {
    // console.log("tranformEventsInRenderFrames");
    // try{
    const numberOfEvents = eventPool.length;
    const numberOfFrames = (sizeOfAnimation * frameRate) / 1000;
    const numberOfEventsPerFrame = (numberOfEvents/numberOfFrames) | 0;
    // console.log(eventPool);
    let frames = [];
    for (let i = numberOfEventsPerFrame; i <= numberOfEvents+numberOfEventsPerFrame; i+=numberOfEventsPerFrame) {
        // console.log("cc",i, i - (numberOfEventsPerFrame),i);
         frames.push(mergeEvents(eventPool.slice(i - (numberOfEventsPerFrame),i)));
        //
    }
    // console.log("frames",frames)
    // }catch(err){
        // console.error(err);
    // }
    return frames;
}

export default tranformEventsInRenderFrames;