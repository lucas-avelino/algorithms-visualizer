import 'typescript/lib/lib.dom';
import Item from './objects/Item'
import Event from './objects/Event'

export default class Render{
    renderFrames: Array<Event> = [];
    framesPerSecond: number = 25;
    ms: number = 0;
    renderLoopHandler: number = 0;
    timeInExec: number = 1000;
    element: JQuery;

    constructor(element){
        this.element = element;
    }

    //Function that starts render 
    renderLoop = () => {
        this.renderLoopHandler = setInterval(async () => {this.render()}, 1000/this.framesPerSecond) as unknown as number;
    }

    //Function that prepare render and transform the events into frames to be rendered
    prepareRender = (eventPool: Event[]) => {
        this.ms = this.timeInExec * 1000;
        this.renderFrames = this.tranformEventsInRenderFrames(eventPool, this.framesPerSecond, this.ms || 1000);
    }

    //Function that render the first state of array
    initialRender = async (array: Item[], name: string) => {
        const h = this.element.height();
        const colSize = 100 / array.length;
        const unitHSize = h/Math.max(...(array.map((a)=>a.value)));

        this.element.append(`<h4 style="color:white;position: absolute; top: 0; left: 2px;">${name}</h4>`);
        array.map((item,i) => {
            this.element.append(`<div val="${item.id}" class="bar-item bg-primary" style="color: white; order:${i}; height: ${unitHSize*item.value}px;width: ${colSize}%;"></div>`);
        });
    }

    //Function that are called by the render loop to render the next frame
    render = async () => {
        if(this.renderFrames == null || this.renderFrames == [] || !this.renderFrames[0]) clearInterval(this.renderLoopHandler);
        const frame = this.renderFrames.shift();
        if(JSON.stringify(frame) != "{}"){
            for (const key in frame) {
                this.element.children(`.bar-item[val=${frame[key].id}]`).css({"order": key});
            }
        }
    }

    mergeEvents = (events: Event[]) => {
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
    
    tranformEventsInRenderFrames = (eventPool: Event[], frameRate: number, sizeOfAnimation: number) => {
        const numberOfEvents = eventPool.length;
        let numberOfFrames = sizeOfAnimation > 0
            ? (sizeOfAnimation * frameRate) / 1000
            : (1000*frameRate) / 1000;
        const numberOfEventsPerFrame = (numberOfEvents/numberOfFrames);
        let frames = [];
        for (let i = numberOfEventsPerFrame; i <= numberOfEvents+numberOfEventsPerFrame && eventPool.length != 0; i+=numberOfEventsPerFrame) {
             frames.push(this.mergeEvents(eventPool.slice((i - (numberOfEventsPerFrame) | 0),i | 0)));
        }
        return frames.filter((a) => a != null);
    }
}