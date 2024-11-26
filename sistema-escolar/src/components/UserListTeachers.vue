<!-- UserList.vue -->
<template>
    <div class="user-list-container">
      <v-list class="grey-darken-4">
        <v-list-item
          v-for="teacher in teachers"
          :key="teacher.id"
          class="mt-2"
        >
          <template v-slot:prepend>
            <v-avatar color="blue" size="40">
                <span class="mdi mdi-account-tie"></span>
            </v-avatar>
          </template>
  
          <v-list-item-title class="text-white">{{ teacher.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-grey">{{ teacher.role }}</v-list-item-subtitle>
  
          <template v-slot:append>
            <v-btn
              icon="mdi-pencil"
              variant="text"
              size="small"
              color="white"
              class="mr-2"
              @click="editItem(teacher)"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              variant="text"
              size="small"
              color="red"
              @click="deleteItem(teacher)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </div>
    <add/>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import add from '@/components/addStudent.vue';
  const teachers = ref([
    { id: 1, name: 'Carlos', role: 'teacher' },
    { id: 2, name: 'Maria', role: 'teacher' },
    { id: 3, name: 'Navarro', role: 'teacher' }
  ])
  
  const editItem = (item) => {
    console.log('Editar:', item)
  }
  
  const deleteItem = (item) => {
    console.log('Eliminar:', item)
  }
  
  </script>
  
  <style scoped>
  .user-list-container {
    margin-top: 64px; /* Altura del v-app-bar */
    height: calc(100vh - 64px);
    overflow-y: auto;
  }
  
  .v-list-item {
    transition: background-color 0.2s;
  }
  
  .v-list-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  </style>