// import Frame from "./Frame";
import SorterConfig from "./Sorter.js";
export const Sorters = {
  Bubble: new SorterConfig(0, 'Bubble Sort', 'bubbleSort'),
  Insertion: new SorterConfig(1, 'Insertion Sort', 'insertionSort'),
  Quick: new SorterConfig(2, 'Quick Sort', 'quickSort'),
  Merge: new SorterConfig(3, 'Merge Sort', 'mergeSort')
};
export default class SorterWorkerCommand {
  constructor(threadId, typeOfCommand, data) {
    this.threadId = threadId;
    this.typeOfCommand = typeOfCommand;
    this.data = data;
  }

}
