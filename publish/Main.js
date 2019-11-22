import SorterController from './SorterController.js';
import genRandomArray from './Util.js';
import { Sorters } from './SorterController.js';
$().ready(async () => {
  // console.log($("#sort-algorithms input[type=checkbox]"))
  const genDiv = () => {
    const index = $("#display").children().length;
    $("#display").append(`<div class="flex-fill d-flex align-items-end border rounded" style="position: relative; min-height: 400px; min-width: 50%;background-color: black;" id="list${index}"></div>`);
    return $(`#list${index}`);
  };

  let objects = [];
  $("#runButton").click(e => {
    for (let i = 0; i < objects.length; i++) {
      const element = objects[i];
      element.cancel();
    }

    objects = [];
    $("#display").empty();
    const array = genRandomArray($("#numOfItems").val(), 0, 50);
    objects = $("#sort-algorithms input[type=checkbox]:checked").map((i, element) => {
      return new SorterController(genDiv(), Sorters[element.id], array.map(el => {
        return { ...el
        };
      }), 30).sort();
    }).toArray();

    for (let i = 0; i < objects.length; i++) {
      const element = objects[i];
      element.renderLoop();
    }
  });
  $("#numOfItems").on("input", e => {
    $(this).trigger("change");
    $("#numOfItems").parent().children("label").children("span.w-25").text(e.target.value);
  });
});
