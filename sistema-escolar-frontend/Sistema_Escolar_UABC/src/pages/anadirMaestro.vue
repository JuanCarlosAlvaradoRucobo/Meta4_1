<script setup>
import ReturnLobby from '@/components/returnLobby.vue';
import axios from 'axios';
import { ref } from 'vue';

// Controlador para el overlay (indicador de carga)
const overlay = ref(false);

// Modelo del formulario
const teacherForm = ref({
  no_empleado: 0,
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  gradoAcademico: '',
  estado: ''
});

// Reglas de validación
const rules = {
  required: (v) => !!v || 'Este campo es requerido',
  no_empleado: (v) => v > 0 || 'El número debe ser mayor a 0',
  gradoAcademico: (v) => !!v || 'Este campo es requerido'
};

// Función para enviar el formulario
const submitForm = async () => {
  // Verificar que el formulario sea válido antes de enviarlo
  if (!teacherForm.value.no_empleado || !teacherForm.value.nombre || !teacherForm.value.gradoAcademico) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  overlay.value = true; // Mostrar indicador de carga
  try {
    // Enviar los datos del formulario a la API
    const response = await axios.post('http://localhost:3001/api/maestros', teacherForm.value);
    console.log('Respuesta del servidor:', response.data);

    // Mostrar un mensaje de éxito
    alert('Maestro registrado con éxito.');
    resetForm(); // Limpiar el formulario
  } catch (error) {
    console.error('Error al registrar el maestro:', error);
    alert('Ocurrió un error al registrar el maestro. Intenta de nuevo.');
  } finally {
    overlay.value = false; // Ocultar indicador de carga
  }
};

// Función para resetear el formulario
const resetForm = () => {
  teacherForm.value = {
    no_empleado: 0,
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    gradoAcademico: '',
    estado: ''
  };
};
</script>

<template>
  <v-app>
    <v-main class="pa-4">
      <v-container>
        <v-card class="mx-auto pa-4" max-width="800">
          <v-card-title class="text-h5 mb-4">
            Registro de Nuevo Maestro
          </v-card-title>

          <!-- Formulario -->
          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.no_empleado"
                  label="Número Empleado"
                  :rules="[rules.required, rules.no_empleado]"
                  placeholder="Ingrese el número de empleado"
                  variant="outlined"
                  density="comfortable"
                  type="number"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.nombre"
                  label="Nombre(s)"
                  :rules="[rules.required]"
                  placeholder="Ingrese el nombre"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.apellido_paterno"
                  label="Apellido Paterno"
                  :rules="[rules.required]"
                  placeholder="Ingrese el apellido paterno"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.apellido_materno"
                  label="Apellido Materno"
                  placeholder="Ingrese el apellido materno"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.gradoAcademico"
                  label="Grado Académico"
                  :rules="[rules.required]"
                  placeholder="Ingrese el grado académico"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.estado"
                  label="Estado"
                  placeholder="Ingrese el estado actual del maestro"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                  @click="resetForm"
                  color="error"
                  class="me-4"
                  variant="outlined"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  type="submit"
                  color="primary"
                  variant="elevated"
                >
                  Registrar Maestro
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>

      <!-- Indicador de carga -->
      <v-overlay :model-value="overlay">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-overlay>
    </v-main>

    <!-- Botón de regreso -->
    <ReturnLobby />
  </v-app>
</template>

<style scoped>
.v-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-btn {
  text-transform: none;
}
</style>
