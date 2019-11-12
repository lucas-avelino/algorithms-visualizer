const mergeEvents = (events) => {
    if(events.length == 0){ return null }
    const numberOfElements = events.length;
    let event = events[0];
    if(event == undefined){
        return null;
    }
    for (let i = 1; i < numberOfElements; i++) {
        for (const key in events[i]) {
            if (events[i][key]) {
                event[key] = events[i][key]; 
            }
        }
    }

    return event;
}

const tranformEventsInRenderFrames = (eventPool, frameRate, sizeOfAnimation) => {
    const numberOfEvents = eventPool.length;
    let numberOfFrames = sizeOfAnimation > 0
        ? (sizeOfAnimation * frameRate) / 1000
        : (1000*frameRate) / 1000;
    const numberOfEventsPerFrame = (numberOfEvents/numberOfFrames);
    let frames = [];
    for (let i = numberOfEventsPerFrame; i <= numberOfEvents+numberOfEventsPerFrame && eventPool.length != 0; i+=numberOfEventsPerFrame) {
         frames.push(mergeEvents(eventPool.slice((i - (numberOfEventsPerFrame) | 0),i | 0)));
    }
    return frames.filter((a) => a != null);
}

export default tranformEventsInRenderFrames;