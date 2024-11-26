<script setup >
import ReturnLobby from '@/components/returnLobby.vue';
import { ref } from 'vue';

const teacherForm = ref({
  no_empleado: 0,
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  gradoAcademico: '',	
  estado: ''
});

const rules = {
  required: (v) => !!v || 'Este campo es requerido',
  no_empleado: (v) => v >= 0 || 'El número debe ser válido',
  gradoAcademico: (v) => !!v || 'Este campo es requerido',
};


const submitForm = () => {
  // Aquí irá la lógica para enviar el formulario
  console.log('Datos del maestro:', teacherForm.value);
};

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

          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.no_empleado"
                  label="Numero Empleado"
                  :rules="[rules.required, rules.no_empleado]"
                  placeholder="Ingrese el número de empleado"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.nombre"
                  label="Nombre(s)"
                  :rules="[rules.required, rules.nombre]"
                  placeholder="Ingrese el nombre"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.apellido_paterno"
                  label="Apellido Paterno"
                  :rules="[rules.required, rules.nombre]"
                  placeholder="Ingrese el apellido paterno"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.apellido_materno"
                  label="Apellido Materno"
                  :rules="[rules.nombre]"
                  placeholder="Ingrese el apellido materno"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.gradoAcademico"
                  label="Grado Academico"
                  type="string"
                  :rules="[rules.required, rules.gradoAcademico]"
                  placeholder="Ingrese el grado academico"
                  variant="outlined"
                  density="comfortable"
                  min="0"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="teacherForm.estado"
                  label="Estado"
                  type="string"
                  :rules="[rules.required, rules.required]"
                  placeholder="Ingrese el estado actual del maestro"
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
                  Registrar Maestro
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