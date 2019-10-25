import SorterController from './classes/Sorter.js'
import {SortList,genRandomArray} from './classes/Util.js'
$().ready(async () => {
    console.log($("#sort-algorithms input[type=checkbox]"))

    const genDiv = () => {
        const index = $("#display").children().length;
        $("#display").append(`<div class="h-100 flex-fill d-flex align-items-end" style="min-width: 50%;background-color: black;" id="list${index}"></div>`);
        return $(`#list${index}`);
    }

    let objects = new Array();
    $("#runButton").click((e) => {
        for (let i = 0; i < objects.length; i++) {
            const element = objects[i];
            element.cancel();
        }
        objects = new Array();
        $("#display").empty();

        const array = genRandomArray($("#numOfItems").val(),0 ,50);

        objects = $("#sort-algorithms input[type=checkbox]:checked").map((i,element) => {
            return new SorterController(genDiv(), SortList[element.id], 
                    array.map((el) => {
                        console.log(el);
                        return {...el}
                    })
            );
        });

        for (let i = 0; i < objects.length; i++) {
            const element = objects[i];
            element.sort();
        }
    });

});
