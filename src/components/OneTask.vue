<template lang="html">
  <div class="card position-absolute top-50 start-50 translate-middle w-50">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>

      <ul>
        <li v-for="(step, idx) in taskArray[idxForCorrect].step" :key="idx">
          <label v-if="!step.done">
            <input 
              type="checkbox" 
              :id="'chbx' + idx" 
              
            />
            {{ step.text }}
          </label>
        </li>
      </ul>

      <hr />

      <ul>
        <li v-for="(step, idx) in taskArray[idxForCorrect].step" :key="idx">
          <label v-if="step.done" class="doneList">
            <input
              type="checkbox"
              :id="'chbx' + idx"
              checked
              
            />
            {{ step.text }}
          </label>
        </li>
      </ul>

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
  computed: {
    ...mapGetters(["idxForCorrect"]),
    taskArray: function () {
      return this.$store.state.tasks;
    },
  },
  methods: {
    ...mapMutations(["setIdxForCorrect", "togglerForStepDone"]),
    closeCorrectingWindow() {
      this.setIdxForCorrect(null);
    },
  },
};
</script>

<style lang="css" scoped>
ul {
  list-style-type: none;
}
</style>
