<template lang="html">
  <div>
    <div class="mt-5 d-flex flex-wrap">
      <div
        class="card m-2"
        style="width: 18rem"
        v-for="(task, idx) in taskArray"
        :key="idx"
      >
        <div class="card-body" >
          <h5 class="card-title">{{ task.name }}</h5>
          <ul class="mb-3">
            <li v-for="(undoneStep, idx) in undoneSteps(task)" :key="idx">
              {{ undoneStep }}
            </li>
          </ul>

          <ul class="doneList">
            <li v-for="(doneStep, idx) in doneSteps(task)" :key="idx">
              {{ doneStep }}
            </li>
          </ul>

          <div class="d-flex flex-wrap justify-content-between">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="showModal(idx)"
            >
              Удалить
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="showCorrecting(idx)"
            >
              Посмотреть
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-5 d-flex flex-wrap">
      <div
        class="card m-2"
        style="width: 18rem"
        v-for="(task, idx) in doneTaskArray"
        :key="idx"
      >
        <div class="card-body">
          <h5 class="card-title">{{ task.name }}</h5>
          <ul class="mb-3">
            <li v-for="(undoneStep, idx) in undoneSteps(task)" :key="idx">
              {{ undoneStep }}
            </li>
          </ul>

          <ul class="doneList">
            <li v-for="(doneStep, idx) in doneSteps(task)" :key="idx">
              {{ doneStep }}
            </li>
          </ul>

          <div class="d-flex flex-wrap justify-content-between">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="showModal(idx)"
            >
              Удалить
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="showCorrecting(idx)"
            >
              Посмотреть
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Create New List -->
    <div 
      class="card position-absolute top-50 start-50 translate-middle p-3"
      v-if='isShowNewListCreator'
    >
      <h2 class="text-center">Новый список</h2>
      <div class="input-group mt-3">
        <input
          type="text"
          class="form-control"
          placeholder="Название списка"
          v-model='nameNewList'
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          @click='addNewList(nameNewList)'
        >
          Создать
        </button>
      </div>
    </div>
    <!-- End Create New List -->
    <!-- Modal -->
    <div
      v-if="isShowModal"
      class="position-absolute top-50 start-50 translate-middle"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Подтверждение</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="showModal()"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Вы точно желаете удалить задание "{{
                taskArray[idxForRemove].name
              }}"
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="showModal()"
            >
              Отмена
            </button>
            <button type="button" class="btn btn-primary" @click="removeTask()">
              Да, удалить
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "TaskList",
  data() {
    return {
      isShowModal: false,
      idxForRemove: null,
      nameNewList: ''
    };
  },
  computed: {
    taskArray: function () {
      return this.$store.state.tasks;
    },
    isShowNewListCreator: function(){
      return this.$store.state.isShowNewListCreator;
    },    
  },
  methods: {
    ...mapMutations(["removeOneTask", "setIdxForCorrect", 'toggleShowNewListCreator']),
    removeTask() {
      this.removeOneTask(this.idxForRemove);
      this.idxForRemove = null;
      this.isShowModal = false;
    },
    showCorrecting(idx) {
      this.setIdxForCorrect(idx);
    },
    showModal: function (idx) {
      this.isShowModal = !this.isShowModal;
      this.idxForRemove = idx;
    },
    doneSteps: function (task) {
      let array = [];
      for (let idx in task.step) {
        if (task.step[idx].done) {
          array.push(task.step[idx].text);
        }
      }
      return array;
    },
    undoneSteps: function (task) {
      let array = [];
      for (let idx in task.step) {
        if (!task.step[idx].done) {
          array.push(task.step[idx].text);
        }
      }
      return array;
    },
    addNewList: function (name){
      this.$store.commit('addNewList', name);
      this.isShowNewListCreator = false;
      this.nameNewList = ''
    }
  },
};
</script>

<style lang="css"></style>
