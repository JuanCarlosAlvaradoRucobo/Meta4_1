
<template>
  <div>
    <!-- Overlay para mostrar el indicador de carga -->
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>

    <!-- Condicional para mostrar mensaje o lista -->
    <div class="user-list-container">
      <template v-if="courses.length === 0 && !overlay">
        <v-alert type="info" color="blue" border="left" prominent class="mt-4">
          Empty Courses
        </v-alert>
      </template>

      <v-list v-else class="grey-darken-4">
        <v-list-item v-for="course in courses" :key="course.id" class="mt-2">
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
              @click="openEditDialog(course)"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              variant="text"
              size="small"
              color="red"
              @click="openDeleteDialog(course)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </div>

    <!-- Modal para editar curso -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>
          Edit Course
        </v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-model="valid">
            <v-text-field
              label="Course Name"
              v-model="selectedCourse.nombreMateria"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Department"
              v-model="selectedCourse.Departamento"
              :rules="[rules.required]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="closeEditDialog">Cancel</v-btn>
          <v-btn color="green" text @click="updateCourse">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para confirmar eliminación -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete the course "{{ selectedCourse.nombreMateria }}"?
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="closeDeleteDialog">Cancel</v-btn>
          <v-btn color="green" text @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const courses = ref([]);
const overlay = ref(false); // Controlador del overlay

// Modales y validación
const editDialog = ref(false);
const deleteDialog = ref(false);
const selectedCourse = ref({});
const valid = ref(false);

const rules = {
  required: (value) => !!value || 'Required.',
};

// Funciones para manejar el CRUD
const fetchCourses = async () => {
  overlay.value = true;
  try {
    const response = await axios.get('http://localhost:3001/api/cursos');
    courses.value = response.data;
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    courses.value = [];
  } finally {
    overlay.value = false;
  }
};

const openEditDialog = (course) => {
  selectedCourse.value = { ...course };
  editDialog.value = true;
};

const closeEditDialog = () => {
  editDialog.value = false;
};

const updateCourse = async () => {
  if (!valid.value) return;
  try {
    await axios.put(`http://localhost:3001/api/cursos/${selectedCourse.value.numeroSerie}`, selectedCourse.value);
    fetchCourses(); // Recargar la lista
    closeEditDialog();
  } catch (error) {
    console.error('Error al actualizar curso:', error);
  }
};


const openDeleteDialog = (course) => {
  selectedCourse.value = course;
  deleteDialog.value = true;
};

const closeDeleteDialog = () => {
  deleteDialog.value = false;
};

const confirmDelete = async () => {
  overlay.value = true;
  try {
    await axios.delete(`http://localhost:3001/api/cursos/${selectedCourse.value.numeroSerie}`);
    courses.value = courses.value.filter(course => course.numeroSerie !== selectedCourse.value.numeroSerie);
    closeDeleteDialog();
  } catch (error) {
    console.error('Error al eliminar curso:', error);
  } finally {
    overlay.value = false;
  }
};


onMounted(() => {
  fetchCourses();
});
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
