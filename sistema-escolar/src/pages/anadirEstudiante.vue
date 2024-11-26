<script setup>
import ReturnLobby from '@/components/returnLobby.vue';
import { ref } from 'vue';

const studentForm = ref({
  matricula: '',
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  semestres_cursados: 0,
  creditos_totales: 0
});

const rules = {
  required: (v) => !!v || 'Este campo es requerido',
  matricula: (v) => /^[A-Z0-9]{10}$/.test(v) || 'La matrícula debe tener 10 caracteres alfanuméricos',
  numberPositive: (v) => v >= 0 || 'El número debe ser positivo',
  name: (v) => /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(v) || 'Ingrese un nombre válido'
};

const submitForm = () => {
  // Aquí irá la lógica para enviar el formulario
  console.log('Datos del estudiante:', studentForm.value);
};

const resetForm = () => {
  studentForm.value = {
    matricula: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    semestres_cursados: 0,
    creditos_totales: 0
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

          <v-form @submit.prevent="submitForm">
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
                  @click="submitForm"
                  color="primary"
                  type="submit"
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