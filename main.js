import SorterController from './classes/Sorter.js'

$().ready(async () => {
    const mainController = new SorterController($("#list"));
    const mainController2 = new SorterController($("#list2"));
    const mainController3 = new SorterController($("#list3"));
    const array = mainController.genRandomArray(100,0,100);
    mainController2.setArray(new Array(...array));
    mainController3.setArray(new Array(...array));
    mainController.typeInExec = "Bubble Sort";
    mainController2.typeInExec = "Insertion Sort";
    mainController3.typeInExec = "Quick Sort";
    mainController.bubbleSort();
    mainController2.insertionSort();
    mainController3.quickSort();
});
