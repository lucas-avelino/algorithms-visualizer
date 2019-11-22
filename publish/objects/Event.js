export const EventType = {
  Movement: 0 // Comparassion: 1

}; //Class that contains the event logic

export default class Event {
  constructor(eventType, data) {
    if (eventType == EventType.Movement) {
      let diff = {};

      for (const key in data.initialState) {
        if (data.initialState[key] != data.endState[key]) {
          diff[key] = data.endState[key];
        }
      }

      this.value = diff;
    }
  }

}
