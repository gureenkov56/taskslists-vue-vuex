<template>
  <div class="hello">
    <div class="d-flex justify-content-between mt-3">
      <h1>TaskList</h1>
      <button 
        type="button" 
        class="btn btn-outline-primary"
        @click='toggleShowNewListCreator()'
      >
      Добавить задачу
      </button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "Header",
  methods: {
    ...mapMutations(['toggleShowNewListCreator'])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
