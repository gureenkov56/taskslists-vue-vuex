<template lang="html">
  <div class="card position-absolute top-50 start-50 translate-middle w-50">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>

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

      <button
        type="button"
        class="btn btn-primary"
        @click="closeCorrectingWindow()"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "OneTask",
  data(){
    return {
      model: [],
    }
  },
  computed: {
    ...mapGetters(["idxForCorrect"]),
    taskArray: function () {
      return this.$store.state.tasks;
    },
    getDoneStep: function(){
      let res = [];
      for(let idx in this.taskArray[this.idxForCorrect].step){
        if(this.taskArray[this.idxForCorrect].step[idx].done){
          res.push(idx);
        }
      }
      return res;
    }
  },
  methods: {
    ...mapMutations(["setIdxForCorrect", 'refreshDoneStatus']),
    closeCorrectingWindow() {
      let payload = {idxForCorrect: this.idxForCorrect, doneStepIdxArray: this.model};
      // this.refreshDoneStatus(payload);
      this.$store.commit('refreshDoneStatus', payload);

      this.setIdxForCorrect(null);

    },
  },
  mounted(){
    this.model = this.getDoneStep;
  }
};
</script>

<style lang="css" scoped>
ul {
  list-style-type: none;
}
</style>
