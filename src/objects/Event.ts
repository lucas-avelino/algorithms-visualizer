import Item from "./Item.js"

export const EventType = {
    Movement: 0,
    // Comparassion: 1
}

//Class that contains the event logic
export default class Event{
    eventType: number;
    value: {[key: string]: Item};

    constructor(eventType: number, data: {initialState: Array<Item>, endState: Array<Item>}) {
        if(eventType == EventType.Movement){
            let diff = {};
            for (const key in data.initialState) {
                if(data.initialState[key] != data.endState[key]){
                    diff[key] = data.endState[key];
                }
            }
            this.value = diff;
        }
    }
}