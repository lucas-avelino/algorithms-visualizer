import Render from './Render.js';
import SorterWorkerCommand from './objects/WorkerCommand.js';
export let Status;

(function (Status) {
  Status[Status["Builded"] = 0] = "Builded";
  Status[Status["WaitingWorker"] = 1] = "WaitingWorker";
  Status[Status["WaitingRender"] = 2] = "WaitingRender";
})(Status || (Status = {}));

export default class SorterController extends Render {
  typeInExec = "";
  // timeInExec: number = 1000;
  eventPool = [];

  constructor(div, config, array, framesPerSecond, threadId) {
    super(div);
    this.config = config;
    this.worker = new Worker("./publish/SorterWorker.js", {
      type: "module"
    });
    this.worker.onmessage = this.sortDone;
    this.threadId = threadId;
    this.array = array;
    this.initialRender(array, config.label);
    this.status = Status.Builded;
  }

  sort = () => {
    this.worker.postMessage(JSON.stringify(new SorterWorkerCommand(this.threadId, this.config, this.array)));
    this.status = Status.WaitingWorker;
  };
  sortDone = e => {
    const workerResponse = JSON.parse(e.data);
    this.timeInExec = workerResponse.timeInExec;
    this.eventPool = workerResponse.events;
    this.prepareRender(this.eventPool);
    this.status = Status.WaitingRender;
    console.log(this);
    this.worker.terminate();
  };
  cancel = () => {
    this.worker.terminate(); //clearInterval(this.renderLoopHandler);
  };
}
