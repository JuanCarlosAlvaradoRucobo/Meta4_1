<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const valid = ref(false);
const studentForm = ref({
  matricula: '',
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  semestres_cursados: 0,
  creditos_totales: 0,
  estado: '', // Inicializamos 'estado' correctamente
});

const rules = {
  required: (value) => !!value || 'Este campo es requerido.',
  matricula: (value) => /^[A-Z0-9]{10}$/.test(value) || 'La matrícula debe tener 10 caracteres alfanuméricos.',
  numberPositive: (value) => value >= 0 || 'El número debe ser positivo.',
  name: (value) => /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(value) || 'Ingrese un nombre válido.',
};

const submitForm = async () => {
  if (valid.value) {
    try {
      const response = await axios.post('http://localhost:3001/api/alumnos', studentForm.value);
      console.log('Estudiante creado:', response.data);
      router.push('/estudiantes'); // Redirige al listado de estudiantes
    } catch (error) {
      console.error('Error al crear estudiante:', error);
    }
  }
};

const resetForm = () => {
  // Resetea los campos del formulario
  studentForm.value = {
    matricula: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    semestres_cursados: 0,
    creditos_totales: 0,
    estado: '',
  };
};
</script>

<template>
  <v-app>
    <v-main class="pa-4">
      <v-container>
        <v-card class="mx-auto pa-4" max-width="800">
          <v-card-title class="text-h5 mb-4">
            Registro de Nuevo Estudiante
          </v-card-title>

          <v-form v-model="valid" @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentForm.matricula"
                  label="Matrícula"
                  :rules="[rules.required, rules.matricula]"
                  placeholder="Ingrese la matrícula"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentForm.nombre"
                  label="Nombre(s)"
                  :rules="[rules.required, rules.name]"
                  placeholder="Ingrese el nombre"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentForm.apellido_paterno"
                  label="Apellido Paterno"
                  :rules="[rules.required, rules.name]"
                  placeholder="Ingrese el apellido paterno"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentForm.apellido_materno"
                  label="Apellido Materno"
                  :rules="[rules.name]"
                  placeholder="Ingrese el apellido materno"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentForm.semestres_cursados"
                  label="Semestres Cursados"
                  type="number"
                  :rules="[rules.required, rules.numberPositive]"
                  placeholder="Ingrese el número de semestres"
                  variant="outlined"
                  density="comfortable"
                  min="0"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentForm.creditos_totales"
                  label="Créditos Totales"
                  type="number"
                  :rules="[rules.required, rules.numberPositive]"
                  placeholder="Ingrese el total de créditos"
                  variant="outlined"
                  density="comfortable"
                  min="0"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="studentForm.estado"
                  label="Estado"
                  :rules="[rules.required]"
                  placeholder="Ingrese el estado"
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
                  Registrar Estudiante
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
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
