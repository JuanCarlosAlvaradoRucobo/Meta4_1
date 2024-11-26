<template>
  <div>
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
                  v-model="editedItem.name"
                  label="Nombre"
                  required
                  :rules="[v => !!v || 'Nombre es requerido']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.employee_number"
                  label="Número de Empleado"
                  required
                  :rules="[v => !!v || 'Número de empleado es requerido']"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.department"
                  label="Departamento"
                  required
                  :rules="[v => !!v || 'Departamento es requerido']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="editedItem.status"
                  :items="['Activo', 'Inactivo']"
                  label="Estado"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            variant="text"
            @click="closeEdit"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="saveEdit"
            :loading="savingEdit"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de confirmación para eliminar -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">¿Estás seguro?</v-card-title>
        <v-card-text>Esta acción eliminará permanentemente al maestro.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            variant="text"
            @click="deleteDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="confirmDelete"
            :loading="deleting"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="user-list-container">
      <template v-if="error">
        <v-alert
          type="error"
          border="left"
          prominent
          color="red"
          class="mt-4"
        >
          {{ errorMessage }}
        </v-alert>
      </template>

      <template v-else-if="teachers.length === 0 && !overlay">
        <v-alert
          type="info"
          color="blue"
          border="left"
          prominent
          class="mt-4"
        >
          No se encontraron maestros
        </v-alert>
      </template>

      <v-list v-else class="grey-darken-4">
        <v-list-item
          v-for="(teacher, index) in visibleTeachers"
          :key="teacher.employee_number"
          class="mt-2"
        >
          <template v-slot:prepend>
            <v-avatar color="blue" size="40">
              <span class="mdi mdi-account-tie"></span>
            </v-avatar>
          </template>

          <v-list-item-title class="text-white">{{ teacher.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-grey">
            Número de Empleado: {{ teacher.employee_number }} | 
            Departamento: {{ teacher.department }} |
            Estado: {{ teacher.status }}
          </v-list-item-subtitle>

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

      <div v-if="teachers.length > visibleCount" class="text-center mt-4">
        <v-btn
          color="primary"
          @click="loadMore"
          :loading="loadingMore"
        >
          {{ loadingMore ? 'Cargando...' : 'Cargar más' }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

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

const editedItem = ref({
  id: null,
  name: '',
  employee_number: '',
  department: '',
  status: 'Activo'
});

const itemToDelete = ref(null);

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

onMounted(() => {
  fetchTeachers();
});

const editItem = (item) => {
  editedItem.value = { ...item };
  editDialog.value = true;
};

const closeEdit = () => {
  editDialog.value = false;
  editedItem.value = {
    id: null,
    name: '',
    employee_number: '',
    department: '',
    status: 'Activo'
  };
};

const saveEdit = async () => {
  savingEdit.value = true;
  try {
    await axios.put(`http://localhost:3001/api/maestros/${editedItem.value.numero_empleado}`, editedItem.value);
    
    const index = teachers.value.findIndex(t => t.id === editedItem.value.numero_empleado);
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

const deleteItem = (item) => {
  itemToDelete.value = item;
  deleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!itemToDelete.value) return;
  
  deleting.value = true;
  try {
    await axios.delete(`http://localhost:3001/api/maestros/${itemToDelete.value.numero_empleado}`);
    teachers.value = teachers.value.filter(t => t.id !== itemToDelete.value.numero_empleado);
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

const loadMore = async () => {
  loadingMore.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  visibleCount.value += 10;
  loadingMore.value = false;
};

const visibleTeachers = computed(() =>
  teachers.value.slice(0, visibleCount.value)
);
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