import Item from './objects/Item.js'
import Event from './objects/Event.js'
import Frame from './objects/Frame.js';

export default class Render{
    renderFrames: Array<Frame> = [];
    framesPerSecond: number = 25;
    ms: number = 0;
    renderLoopHandler: number = 0;
    timeInExec: number = 1000;
    element: JQuery;

    constructor(element: JQuery){
        this.element = element;
    }

    //Function that starts render 
    renderLoop = () => {
        this.renderLoopHandler = setInterval(async () => {this.render()}, 1000/this.framesPerSecond) as number;
    }

    //Function that prepare render and transform the events into frames to be rendered
    prepareRender = (eventPool: Array<Event>) => {
        this.ms = this.timeInExec * 1000;
        this.renderFrames = this.tranformEventsInRenderFrames(eventPool, this.framesPerSecond, this.ms || 1000);
    }

    //Function that render the first state of array
    initialRender = async (array: Array<Item>, name: string) => {
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
        if(this.renderFrames == null || this.renderFrames == [] || !this.renderFrames[0]) {
            clearInterval(this.renderLoopHandler);
            return;
        }
        const frame = this.renderFrames.shift()!.value;
        if(JSON.stringify(frame) != "{}"){
            frame.forEach(event => {
                const value = event.value;
                for (const key in value) {
                    this.element.children(`.bar-item[val=${value[key].id}]`).css({"order": key});
                }
            });
        }
    }

    //Function that convert 
    tranformEventsInRenderFrames = (eventPool: Array<Event>, frameRate: number, sizeOfAnimation: number): Array<Frame> => {
        const numberOfEvents = eventPool.length;
        let numberOfFrames = sizeOfAnimation > 0
            ? (sizeOfAnimation * frameRate) / 1000
            : (1000*frameRate) / 1000;
        const numberOfEventsPerFrame = (numberOfEvents/numberOfFrames);
        let frames: Array<Frame> = [];
        for (let i = numberOfEventsPerFrame; i <= numberOfEvents+numberOfEventsPerFrame && eventPool.length != 0; i+=numberOfEventsPerFrame) {
            frames.push(new Frame(eventPool.slice((i - (numberOfEventsPerFrame) | 0),i | 0)));
        }
        return frames.filter((a) => a != null);
    }
}
