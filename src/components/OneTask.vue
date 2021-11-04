<template lang="html">
  <div class="card position-absolute top-50 start-50 translate-middle w-50">
    <div class="card-body">
      <h5 class="card-title">{{ taskArray[idxForCorrect].name }}</h5>

      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Введите текст"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          v-model="newStep"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          @click="addNewStep()"
        >
          Добавить
        </button>
      </div>

      <ul>
        <li v-for="(step, idx) in taskArray[idxForCorrect].step" :key="idx">
          <label>
            <input
              type="checkbox"
              :id="'chbx' + idx"
              :value="idx"
              v-model="model"
            />
            {{ step.text }}
          </label>
        </li>
      </ul>

      <hr />
      <div class="d-flex justify-content-between">
        <button
          type="button"
          class="btn btn-primary"
          @click="closeCorrectingWindow()"
        >
          OK
        </button>
        <button 
          type="button" 
          class="btn btn-outline-success"
          @click='markAsDone(idxForCorrect)'
        >
        Выполнено
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "OneTask",
  data() {
    return {
      model: [],
      newStep: "",
    };
  },
  computed: {
    ...mapGetters(["idxForCorrect"]),
    taskArray: function () {
      return this.$store.state.tasks;
    },
    getDoneStep: function () {
      let res = [];
      for (let idx in this.taskArray[this.idxForCorrect].step) {
        if (this.taskArray[this.idxForCorrect].step[idx].done) {
          res.push(idx);
        }
      }
      return res;
    },
  },
  methods: {
    ...mapMutations(["setIdxForCorrect", "refreshDoneStatus", 'totalDoneTask']),
    closeCorrectingWindow() {
      let payload = {
        idxForCorrect: this.idxForCorrect,
        doneStepIdxArray: this.model,
      };
      // this.refreshDoneStatus(payload);
      this.$store.commit("refreshDoneStatus", payload);

      this.setIdxForCorrect(null);
    },
    addNewStep() {
      let payload = {
        taskIdx: this.idxForCorrect,
        newStep: this.newStep,
      };
      this.$store.commit("addNewStep", payload);
      this.newStep = "";
    },
    markAsDone(){
      this.totalDoneTask(this.idxForCorrect);
      this.model.splice(0, this.model.length);
      for(let a = 0; a < this.taskArray[this.idxForCorrect].step.length; a++){
        this.model.push(a);
      }
      this.closeCorrectingWindow()
    }
  },
  mounted() {
    this.model = this.getDoneStep;
  },
};
</script>

<style lang="css" scoped>
ul {
  list-style-type: none;
}
</style>
