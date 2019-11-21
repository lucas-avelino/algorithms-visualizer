export default class Frame {
  value = [];

  constructor(events) {
    this.value = events;
  }

} // mergeEvents = (events: Event[]) => {
//     if(events.length == 0){ return null }
//     const numberOfElements = events.length;
//     let event = events[0];
//     if(event == undefined){
//         return null;
//     }
//     for (let i = 1; i < numberOfElements; i++) {
//         for (const key in events[i]) {
//             if (events[i][key]) {
//                 event[key] = events[i][key]; 
//             }
//         }
//     }
//     return event;
// }
