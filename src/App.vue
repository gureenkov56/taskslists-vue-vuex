<template>
  <div class="container">
    <Header />
    <TaskList />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import TaskList from "./components/TaskList.vue";


export default {
  name: "App",
  components: {
    Header,
    TaskList
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
