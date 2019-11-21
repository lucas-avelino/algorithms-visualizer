import Event from "./Event.js";

export default class Frame {
    value: Array<Event> = []

    constructor(events: Array<Event>){
        this.value = events;
    }

}
