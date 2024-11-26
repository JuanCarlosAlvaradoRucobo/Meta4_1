<template>
  <div>
    <!-- Overlay para mostrar el indicador de carga -->
    <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>

    <!-- Diálogo de edición -->
    <v-dialog v-model="editDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Alumno</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.matricula"
                  label="Matrícula"
                  required
                  :rules="[v => !!v || 'Matrícula es requerida']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.nombre"
                  label="Nombre"
                  required
                  :rules="[v => !!v || 'Nombre es requerido']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.apellido_paterno"
                  label="Apellido Paterno"
                  required
                  :rules="[v => !!v || 'Apellido paterno es requerido']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.semestres_cursados"
                  label="Semestres Cursados"
                  type="number"
                  min="0"
                  required
                  :rules="[
                    v => !!v || 'Semestres cursados es requerido',
                    v => v >= 0 || 'No puede ser negativo'
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.creditos_totales"
                  label="Créditos Totales"
                  type="number"
                  min="0"
                  required
                  :rules="[
                    v => !!v || 'Créditos totales es requerido',
                    v => v >= 0 || 'No puede ser negativo'
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="editedItem.estado"
                  :items="['Activo', 'Inactivo', 'Egresado']"
                  label="Estado"
                  required
                  :rules="[v => !!v || 'Estado es requerido']"
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
        <v-card-text>Esta acción eliminará permanentemente al alumno.</v-card-text>
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

    <!-- Contenedor de la lista de alumnos -->
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

      <template v-else-if="alumnos.length > 0">
        <v-list class="grey-darken-4">
          <v-list-item
            v-for="(alumno, index) in visibleAlumnos"
            :key="alumno.id"
            class="mt-2"
          >
            <template v-slot:prepend>
              <v-avatar color="blue" size="40">
                <v-icon color="white">mdi-account</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title class="text-white">
              {{ alumno.nombre }} {{ alumno.apellido_paterno }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-grey">
              Matrícula: {{ alumno.matricula }} | Semestres: {{ alumno.semestres_cursados }} | 
              Créditos: {{ alumno.creditos_totales }} | Estado: {{ alumno.estado }}
            </v-list-item-subtitle>

            <template v-slot:append>
              <v-btn
                icon="mdi-pencil"
                variant="text"
                size="small"
                color="white"
                class="mr-2"
                @click="editItem(alumno)"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                variant="text"
                size="small"
                color="red"
                @click="deleteItem(alumno)"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
        
        <div v-if="alumnos.length > visibleCount" class="text-center mt-4">
          <v-btn
            :loading="loadingMore"
            color="primary"
            @click="loadMore"
          >
            <template v-if="loadingMore">Cargando...</template>
            <template v-else>Cargar más</template>
          </v-btn>
        </div>
      </template>

      <template v-else>
        <div class="text-center mt-5">
          <v-icon color="grey" size="64">mdi-account-off</v-icon>
          <p class="text-grey">No hay alumnos disponibles.</p>
        </div>
      </template>
    </div>
  </div>
  <add />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import add from '@/components/addStudent.vue';

const alumnos = ref([]);
const visibleCount = ref(10);
const overlay = ref(false);
const loadingMore = ref(false);
const error = ref(false);
const errorMessage = ref('');
const editDialog = ref(false);
const deleteDialog = ref(false);
const savingEdit = ref(false);
const deleting = ref(false);
const editedItem = ref({
  id: null,
  matricula: '',
  nombre: '',
  apellido_paterno: '',
  semestres_cursados: 0,
  creditos_totales: 0,
  estado: 'Activo'
});
const itemToDelete = ref(null);

const fetchAlumnos = async () => {
  overlay.value = true;
  error.value = false;
  try {
    const response = await axios.get('http://localhost:3001/api/alumnos');
    alumnos.value = response.data;
  } catch (err) {
    console.error('Error al obtener alumnos:', err);
    error.value = true;
    errorMessage.value = 'No se pudieron cargar los datos. Inténtalo más tarde.';
    alumnos.value = [];
  } finally {
    overlay.value = false;
  }
};

onMounted(() => {
  fetchAlumnos();
});

const editItem = (item) => {
  editedItem.value = { ...item };
  editDialog.value = true;
};

const closeEdit = () => {
  editDialog.value = false;
  editedItem.value = {
    id: null,
    matricula: '',
    nombre: '',
    apellido_paterno: '',
    semestres_cursados: 0,
    creditos_totales: 0,
    estado: 'Activo'
  };
};

const saveEdit = async () => {
  savingEdit.value = true;
  try {
    // Convertir valores a formato numérico antes de enviarlos
    const dataToSend = {
      ...editedItem.value,
      semestres_cursados: Number(editedItem.value.semestres_cursados),
      creditos_totales: Number(editedItem.value.creditos_totales)
    };

    // Llamar a la API enviando la matrícula
    await axios.put(`http://localhost:3001/api/alumnos/${editedItem.value.matricula}`, dataToSend);
    
    // Actualizar el alumno en la lista local
    const index = alumnos.value.findIndex(a => a.matricula === editedItem.value.matricula);
    if (index !== -1) {
      alumnos.value[index] = { ...dataToSend };
    }
    
    closeEdit(); // Cerrar el diálogo de edición
  } catch (err) {
    console.error('Error al actualizar alumno:', err);
    error.value = true;
    errorMessage.value = 'Error al actualizar el alumno. Inténtalo más tarde.';
  } finally {
    savingEdit.value = false;
  }
};
const deleteItem = (item) => {
  itemToDelete.value = item; // Guardar el alumno a eliminar
  deleteDialog.value = true; // Mostrar el diálogo de confirmación
};

const confirmDelete = async () => {
  if (!itemToDelete.value) return; // Verificar que haya un alumno seleccionado
  
  deleting.value = true;
  try {
    // Enviar la matrícula al back-end para eliminar el alumno
    await axios.delete(`http://localhost:3001/api/alumnos/${itemToDelete.value.matricula}`);
    
    // Actualizar la lista local eliminando el alumno por matrícula
    alumnos.value = alumnos.value.filter(a => a.matricula !== itemToDelete.value.matricula);
    
    deleteDialog.value = false; // Cerrar el diálogo
  } catch (err) {
    console.error('Error al eliminar alumno:', err);
    error.value = true;
    errorMessage.value = 'Error al eliminar el alumno. Inténtalo más tarde.';
  } finally {
    deleting.value = false;
    itemToDelete.value = null; // Limpiar el alumno seleccionado
  }
};


const visibleAlumnos = computed(() =>
  alumnos.value.slice(0, visibleCount.value)
);

const loadMore = async () => {
  loadingMore.value = true;
  await new Promise((resolve) => setTimeout(resolve, 500));
  visibleCount.value += 10;
  loadingMore.value = false;
};
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

.text-grey {
  color: grey;
}
</style>