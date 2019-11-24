## Algorithms visualizer
The purpose of this repository is create a visualisation to how some algorithms works.
The project has two versions the v1.0 the languege that I use to code the logic was JavaScript,
but in v2.0 all the JavaScript was migrated for `TypeScript ^3.7.2`, with npm modules.

The language of the scripts is JavaScript and the libs that I'm using is `JQuery 3.4.1` and `Bootstrap 4.3.1`
 
You can test the "web aplication" on the link bellow:

[GitHub WebSite](https://lucas-avelino.github.io/algorithms-visualizer/)

## TODO
 - Features:
	- [ ] [Sorters] Make the arrays editable for users;
	- [ ] [Sorters] Make the time line bar for user control the render;
	- [ ] [Sorters] Create a load screen while the arrays are sorted;

 - Improvements:
	- [X] [UX] Interface and render function;
	- [X] [Rendering] New async render function;
	- [X] [General] Migration to TypeScript;
		- [X] Install TypeScript Dependencies;
		- [X] Make All code Migrations;
		- [X] Install Babel to compile the solution;
		- [ ] Create Babel compile Watcher;
	- [ ] [Engine] Start using WebWorkers to process the sort function;

 - Bugs:
	- [X] [Rendering] Identify and fix memory leak that make page break;
	- [ ] [Rendering] Merge sort are with a strange render;

 - Sort algorithms:
	- [x] Bubble;
	- [x] Quick;
	- [x] Insertion;
	- [X] Merge;
	- [ ] Cocktail;

- Maze solving algorithm:
	- [ ] Shortest path;
	- [ ] Maze-routing;
	- [ ] Trémaux's.