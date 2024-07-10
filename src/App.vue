<script setup>

import Task from './components/Task.vue';
import Filter from './components/Filter.vue';
import ModelWindow from './components/model/ModelWindow.vue';
import AddTaskModel from './components/model/AddTaskModel.vue';
import {useTaskStore} from './stores/tasksStore.js';

const appName = "Taks Manager";

const store = useTaskStore();

store.$subscribe((mutation, state) => {

  localStorage.setItem('tasks', JSON.stringify(state.tasks))
})




</script>

<template>

  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>
          {{ appName }}
        </h1>
      </div>
      <div class="header-side">
        <button @click="store.openModel" class="btn secondary">+ AddTask</button>
      </div>
    </div>

    <Filter />

    <div class="tasks">

      <Task  v-for="(task, index) in store.filterdTasks" :task="task" :key="index" />


    </div>


    <ModelWindow v-if="store.modelIsActive">
      <AddTaskModel />

    </ModelWindow>
  </main>



</template>


<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }

}



.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}



.add-task {
  margin-top: 60px;

  input,
  textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}
</style>