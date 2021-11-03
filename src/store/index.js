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
          name: "Починить авто",
          step: [
            {
              text: "Позвонить автомеханику",
              done: false,
            },
            {
              text: "Купить запчасть",
              done: false,
            },
            {
              text: "Забрать авто с сервиса",
              done: false,
            },
          ],
        },
      ],
    };
  },
  mutations: {
    removeOneTask(state, idx) {
      state.tasks.splice(idx, 1)
      console.log(idx)
    },
  },
});

export default store;