import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";


const store = createStore({
  state() {
    return {
      tasks: [
        {
          name: "Починить авто",
          fullDone: false,
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
          fullDone: false,
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
      isShowNewListCreator: false,
    };
  },
  mutations: {
    removeOneTask(state, idx) {
      state.tasks.splice(idx, 1);
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
    addNewStep(state, payload) {
      let taskIdx = payload.taskIdx;
      let newStep = payload.newStep;
      state.tasks[taskIdx].step.push({ text: newStep, done: false });
    },
    addNewList(state, name) {
      state.tasks.push({ name, fullDone: false, step: [] });
      state.isShowNewListCreator = false;
    },
    toggleShowNewListCreator(state) {
      state.isShowNewListCreator = !state.isShowNewListCreator;
    },
    totalDoneTask(state, idxTask) {
      state.tasks[idxTask].fullDone = true;
      for (let idxStep in state.tasks[idxTask].step) {
        state.tasks[idxTask].step[idxStep].done = true;
      }
    },
  },
  getters: {
    idxForCorrect(state) {
      return state.idxOfTaskForCorrect;
    },
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});

export default store;
