import SorterController from './classes/Sorter.js'
import {SortList,genRandomArray} from './classes/Util.js'

$().ready(async () => {
    // console.log($("#sort-algorithms input[type=checkbox]"))

    const genDiv = () => {
        const index = $("#display").children().length;
        $("#display").append(`<div class="flex-fill d-flex align-items-end border rounded" style="position: relative; min-height: 400px; min-width: 50%;background-color: black;" id="list${index}"></div>`);
        return $(`#list${index}`);
    }

    let objects = new Array();

    $("#runButton").not(".disabled").click(async (e) => {
        console.log("oi")
        console.log(document.getElementById("loading"))
        document.getElementById("loading").style.display = "flex";
        console.log("oi")
        // $("#runButton").attr("disabled", true);
        // $("#runButton").addClass("disabled");

        setTimeout(func,0);
        // $("#runButton").attr("disabled", false);
        // $("#runButton").removeClass("disabled");
    });

    const func = async () => {
        for (let i = 0; i < objects.length; i++) {
            const element = objects[i];
            element.cancel();
        }
        objects = new Array();
        $("#display").empty();

        const array = genRandomArray($("#numOfItems").val(),0 ,50);
        console.log(`[${performance.now()}]: Ordenando...`)
        objects = $("#sort-algorithms input[type=checkbox]:checked").map((i,element) => {
            return (new SorterController(genDiv(), SortList[element.id], 
                    array.map((el) => {
                        return {...el}
                    }), 30
            ).sort());
        });
        console.log(`[${performance.now()}]: Ordenado!`)
        for (let i = 0; i < objects.length; i++) {
            const element = objects[i];
            console.log(element);
            element.renderLoop(1000/30);
        }
        document.getElementById("loading").style.display = "none";
    }

    $("#numOfItems").on("input", (e) => {
        $(this).trigger("change");
        $("#numOfItems").parent().children("label").children("span.w-25").text(e.target.value)
    });
});
