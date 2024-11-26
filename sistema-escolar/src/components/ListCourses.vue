<template>
  <div>
    <!-- Overlay para mostrar el indicador de carga -->
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>

    <!-- Condicional para mostrar mensaje o lista -->
    <div class="user-list-container">
      <template v-if="courses.length === 0 && !overlay">
        <v-alert
          type="info"
          color="blue"
          border="left"
          prominent
          class="mt-4"
        >
          Empty Courses
        </v-alert>
      </template>

      <v-list v-else class="grey-darken-4">
        <v-list-item
          v-for="course in courses"
          :key="course.id"
          class="mt-2"
        >
          <template v-slot:prepend>
            <v-avatar color="blue" size="40">
              <span class="mdi mdi-book"></span>
            </v-avatar>
          </template>

          <v-list-item-title class="text-white">{{ course.nombreMateria }}</v-list-item-title>
          <v-list-item-subtitle class="text-grey">{{ course.Departamento }}</v-list-item-subtitle>

          <template v-slot:append>
            <v-btn
              icon="mdi-pencil"
              variant="text"
              size="small"
              color="white"
              class="mr-2"
              @click="editItem(course)"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              variant="text"
              size="small"
              color="red"
              @click="deleteItem(course)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const courses = ref([]);
const overlay = ref(false); // Controlador del overlay

const fetchCourses = async () => {
  overlay.value = true; // Mostrar overlay al iniciar la carga
  try {
    const response = await axios.get('http://localhost:3001/api/cursos'); // URL de tu API
    courses.value = response.data; // Asignar los datos obtenidos
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    courses.value = [];
  } finally {
    overlay.value = false; // Ocultar overlay al terminar la carga
  }
};

onMounted(() => {
  fetchCourses(); // Cargar los datos al montar el componente
});

const editItem = (item) => {
  console.log('Editar:', item);
};

const deleteItem = (item) => {
  console.log('Eliminar:', item);
};
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
