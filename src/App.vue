<template>
  <div class="container">
    <Header />
    <TaskList />
    <OneTask v-if='idxForCorrect !== null' />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import TaskList from "./components/TaskList.vue";
import OneTask from "./components/OneTask.vue";

import {mapGetters} from "vuex";

export default {
  name: "App",
  components: {
    Header,
    TaskList,
    OneTask
  },
  computed: {
    ...mapGetters(['idxForCorrect']),
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
.doneList {
  text-decoration: line-through;
  color: grey;
}
</style>
