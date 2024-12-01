<template>
  <div>
    <!-- Overlay de carga -->
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>

    <!-- Diálogo de edición -->
    <v-dialog v-model="editDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Maestro</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.nombre"
                  label="Nombre"
                  required
                  :rules="[v => !!v || 'Nombre es requerido']"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.no_empleado"
                  label="Número de Empleado"
                  required
                  disabled
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.departamento"
                  label="Departamento"
                  required
                  :rules="[v => !!v || 'Departamento es requerido']"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="editedItem.estado"
                  :items="['Activo', 'Inactivo']"
                  label="Estado"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" variant="text" @click="closeEdit">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="saveEdit" :loading="savingEdit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de confirmación para eliminar -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">¿Estás seguro?</v-card-title>
        <v-card-text>Esta acción eliminará permanentemente al maestro.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="primary" variant="text" @click="confirmDelete" :loading="deleting">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Lista de maestros -->
    <div class="user-list-container">
      <!-- Mostrar error -->
      <template v-if="error">
        <v-alert type="error" border="left" prominent color="red" class="mt-4">
          {{ errorMessage }}
        </v-alert>
      </template>

      <!-- Mostrar cuando no hay maestros -->
      <template v-else-if="!teachers.length && !overlay">
        <v-alert type="info" color="blue" border="left" prominent class="mt-4">
          No se encontraron maestros
        </v-alert>
      </template>

      <!-- Lista de maestros -->
      <v-list v-else class="grey-darken-4">
        <v-list-item v-for="(teacher, index) in visibleTeachers" :key="teacher.no_empleado" class="mt-2">
          <template v-slot:prepend>
            <v-avatar color="blue" size="40">
              <span class="mdi mdi-account-tie"></span>
            </v-avatar>
          </template>
          <v-list-item-title class="text-white">{{ teacher.nombre }}</v-list-item-title>
          <v-list-item-subtitle class="text-grey">
            Número de Empleado: {{ teacher.no_empleado }} | Departamento: {{ teacher.departamento }} | Estado: {{ teacher.estado }}
          </v-list-item-subtitle>
          <template v-slot:append>
            <v-btn icon="mdi-pencil" variant="text" size="small" color="white" class="mr-2" @click="editItem(teacher)" />
            <v-btn icon="mdi-delete" variant="text" size="small" color="red" @click="deleteItem(teacher)" />
          </template>
        </v-list-item>
      </v-list>

      <!-- Botón de cargar más -->
      <div v-if="teachers.length > visibleCount" class="text-center mt-4">
        <v-btn color="primary" @click="loadMore" :loading="loadingMore">
          {{ loadingMore ? 'Cargando...' : 'Cargar más' }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Variables reactivas
const teachers = ref([]);
const overlay = ref(false);
const visibleCount = ref(10);
const loadingMore = ref(false);
const error = ref(false);
const errorMessage = ref('');
const editDialog = ref(false);
const deleteDialog = ref(false);
const savingEdit = ref(false);
const deleting = ref(false);

// Modelo de edición
const editedItem = ref({
  nombre: '',
  no_empleado: '',
  departamento: '',
  estado: 'Activo',
});

// Maestro a eliminar
const itemToDelete = ref(null);

// Obtener maestros desde la API
const fetchTeachers = async () => {
  overlay.value = true;
  error.value = false;
  try {
    const response = await axios.get('http://localhost:3001/api/maestros');
    teachers.value = response.data;
  } catch (err) {
    console.error('Error al obtener maestros:', err);
    error.value = true;
    errorMessage.value = 'No se pudieron cargar los datos. Inténtalo más tarde.';
    teachers.value = [];
  } finally {
    overlay.value = false;
  }
};

// Llamar a la función de carga al montar el componente
onMounted(() => {
  fetchTeachers();
});



// Editar maestro
const editItem = (item) => {
  editedItem.value = { ...item };
  editDialog.value = true;
};

// Cerrar diálogo de edición
const closeEdit = () => {
  editDialog.value = false;
  editedItem.value = {
    nombre: '',
    no_empleado: '',
    departamento: '',
    estado: 'Activo',
  };
};

// Guardar cambios de edición
const saveEdit = async () => {
  savingEdit.value = true;
  try {
    await axios.put(`http://localhost:3001/api/maestros/${editedItem.value.no_empleado}`, editedItem.value);
    const index = teachers.value.findIndex((t) => t.employee_number === editedItem.value.no_empleado);
    if (index !== -1) {
      teachers.value[index] = { ...editedItem.value };
    }
    closeEdit();
  } catch (err) {
    console.error('Error al actualizar maestro:', err);
    error.value = true;
    errorMessage.value = 'Error al actualizar el maestro. Inténtalo más tarde.';
  } finally {
    savingEdit.value = false;
  }
};

const deleteItem = (teacher) => {
  itemToDelete.value = teacher;
  deleteDialog.value = true; // Abre el diálogo de confirmación
};

// Confirmar eliminación
const confirmDelete = async () => {
  if (!itemToDelete.value) return; // Verificar que haya un alumno seleccionado

  deleting.value = true;
  try {
    await axios.delete(`http://localhost:3001/api/maestros/${itemToDelete.value.no_empleado}`);

    teachers.value = teachers.value.filter(t => t.no_empleado !== itemToDelete.value.no_empleado);
    deleteDialog.value = false;
  } catch (err) {
    console.error('Error al eliminar maestro:', err);
    error.value = true;
    errorMessage.value = 'Error al eliminar el maestro. Inténtalo más tarde.';
  } finally {
    deleting.value = false;
    itemToDelete.value = null;
  }
};

// Mostrar más maestros
const loadMore = () => {
  loadingMore.value = true;
  setTimeout(() => {
    visibleCount.value += 10;
    loadingMore.value = false;
  }, 500);
};

// Lista de maestros visibles
const visibleTeachers = computed(() => teachers.value.slice(0, visibleCount.value));
</script>

<style scoped>
.user-list-container {
  margin-top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.v-list-item {
  transition: background-color 0.2s;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.text-center {
  text-align: center;
}
</style>
