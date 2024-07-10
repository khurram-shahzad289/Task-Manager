import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue';

export const useTaskStore = defineStore('tasks', () => {
    let tasks = reactive(JSON.parse(localStorage.getItem('tasks')) || []);
      let filterBy = ref("");
      let modelIsActive = ref(false);

      function setFilter(value) {
        filterBy.value = value;
      }

      const filterdTasks = computed(() => {
        switch (filterBy.value) {
          case 'todo':
            return tasks.filter(task => !task.completed);
          case 'done':
            return tasks.filter(task => task.completed);
          default:
            return tasks;

        }
      });
      function addTask(newTask) {
        if (newTask.name && newTask.description) {
          newTask.id = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
          tasks.push(newTask);
          closeModel();
        } else {
          alert("please enter the title and description of the task.");
        }
      
      }
      function toggleCompleted(id) {
        tasks.forEach(task => {
          if (task.id == id) {
            task.completed = !task.completed;
          }
        });
      }
      function openModel(){
        modelIsActive.value = true;
      }
      function closeModel(){
        modelIsActive.value = false;
      }
      


    return { tasks, filterBy, setFilter, filterdTasks, addTask, toggleCompleted, openModel, closeModel, modelIsActive }
  })