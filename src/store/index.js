import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      tasks: [
        {
          name: "Починить авто",
          step: [
            {
              text: "Позвонить автомеханику",
              done: false,
            },
            {
              text: "Купить запчасть",
              done: true,
            },
            {
              text: "Забрать авто с сервиса",
              done: false,
            },
          ],
        },
        {
          name: "Купить продукты",
          step: [
            {
              text: "Картошка",
              done: false,
            },
            {
              text: "Хлеб",
              done: true,
            },
            {
              text: "Молоко",
              done: true,
            },
          ],
        },
      ],
      idxOfTaskForCorrect: null,
    };
  },
  mutations: {
    removeOneTask(state, idx) {
      state.tasks.splice(idx, 1);
      console.log(idx);
    },
    setIdxForCorrect(state, newIdx) {
      state.idxOfTaskForCorrect = newIdx;
    },
    refreshDoneStatus(state, payload) {
      let idxForCorrect = payload.idxForCorrect;
      let doneStepIdxArray = payload.doneStepIdxArray;

      // сначала всем проставить false
      for (let idxStep in state.tasks[idxForCorrect].step) {
        state.tasks[idxForCorrect].step[idxStep].done = false;
      }
      // затем отмеченным проставить true
      for (let idx in doneStepIdxArray) {
        let indx = doneStepIdxArray[idx];
        state.tasks[idxForCorrect].step[indx].done = true;
      }
    },
  },
  getters: {
    idxForCorrect(state) {
      return state.idxOfTaskForCorrect;
    },
  },
});

export default store;
