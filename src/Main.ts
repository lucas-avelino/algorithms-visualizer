import SorterController from './SorterController.js'
import genRandomArray from './Util.js'
import { Sorters, SorterWorkerResponse } from './objects/WorkerCommand.js';

$().ready(() => {
    const genDiv = () => {
        const index = $("#display").children().length;
        $("#display").append(`<div class="flex-fill d-flex align-items-end border rounded" style="position: relative; min-height: 400px; min-width: 50%;background-color: black;" id="list${index}"></div>`);
        return $(`#list${index}`);
    }

    let sorters: SorterController[] = [];
    $("#runButton").click((e) => {
        for (let i = 0; i < sorters.length; i++) {
            const element = sorters[i];
            element.cancel();
        }
        sorters = [];
        $("#display").empty();

        const array = genRandomArray($("#numOfItems").val(),0 ,50);
        
        sorters = $("#sort-algorithms input[type=checkbox]:checked").map((i,element) => {
            return (new SorterController(genDiv(), Sorters[element.id], 
                    array.map((el: any) => {
                        return {...el}
                    }), 30, i
            ).sort());
        }).toArray() as unknown as SorterController[];

        for (let i = 0; i < sorters.length; i++) {
            const element = sorters[i];
            element.renderLoop();
        }
    });

    //Wait for workers calls
    addEventListener("message", (e) => {
        console.log("msg received");
        const workerResponse = JSON.parse(e.data) as SorterWorkerResponse;
        const controller = sorters.filter(s => s.threadId == workerResponse.threadId)[0];
        if(controller){
            controller.sortDone(workerResponse);
        }else{
            console.error("Error during to address the worker response");
        }

    });

    $("#numOfItems").on("input", (e) => {
        $(this).trigger("change");
        $("#numOfItems").parent().children("label").children("span.w-25").text((e.target as HTMLInputElement).value)
    });
});
