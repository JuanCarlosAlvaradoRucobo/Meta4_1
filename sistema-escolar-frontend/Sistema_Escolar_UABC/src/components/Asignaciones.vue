<template>
  <div class="search-container">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="matricula"
            label="Matrícula del Alumno"
            outlined
            clearable
            placeholder="Ingresa la matrícula (opcional)"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-btn
            color="primary"
            class="w-100"
            @click="buscarAlumno"
            :loading="cargando"
            :disabled="cargando"
          >
            <v-icon start>mdi-magnify</v-icon>
            Buscar
          </v-btn>
        </v-col>
      </v-row>

      <v-overlay :model-value="cargando" z-index="2000">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-overlay>

      <v-row v-if="resultados.length > 0" justify="center" class="mt-5">
        <v-col v-for="inscripcion in resultados" :key="inscripcion.id" cols="12" md="4">
          <v-card>
            <v-card-title>
              Curso: {{ inscripcion.Curso.nombreMateria }}
            </v-card-title>
            <v-card-text>
              <p><strong>Estado:</strong> {{ inscripcion.estado }}</p>
              <p><strong>Calificación:</strong> {{ inscripcion.calificacion }}</p>
              <p><strong>Fecha de Inscripción:</strong> {{ inscripcion.fecha_inscripcion }}</p>
              <p><strong>Matrícula del Alumno:</strong> {{ inscripcion.matricula_alumno }}</p>
              <p><strong>Nombre del Alumno:</strong> {{ inscripcion.Alumno.nombre }} {{ inscripcion.Alumno.apellido_paterno }}</p>
              <p><strong>Semestres Cursados:</strong> {{ inscripcion.Alumno.semestres_cursados }}</p>
              <p><strong>Créditos Totales:</strong> {{ inscripcion.Alumno.creditos_totales }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="error" justify="center" class="mt-5">
        <v-col cols="12" md="8">
          <v-alert type="error" prominent>
            {{ error }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row v-if="resultados.length === 0 && !cargando && !error" justify="center" class="mt-5">
        <v-col cols="12" md="8">
          <v-alert type="info" prominent>
            No hay inscripciones para mostrar.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const matricula = ref("");
const resultados = ref([]);
const error = ref(null);
const cargando = ref(false);

// Función para buscar las inscripciones del alumno
const buscarAlumno = async () => {
  cargando.value = true;
  error.value = null;
  resultados.value = [];

  try {
    const endpoint = matricula.value
      ? `http://localhost:3001/api/inscripciones/${matricula.value}`
      : "http://localhost:3001/api/inscripciones";

    const response = await axios.get(endpoint);
    console.log(response.data);

    if (response.data.success) {
      resultados.value = response.data.inscripciones;
      if (resultados.value.length === 0) {
        error.value = matricula.value 
          ? "No se encontraron inscripciones para esta matrícula."
          : "No hay inscripciones registradas.";
      }
    } else {
      error.value = "No se encontraron inscripciones.";
    }
  } catch (e) {
    error.value = "Hubo un error al realizar la búsqueda.";
    console.error(e);
  } finally {
    cargando.value = false;
  }
};
</script>

<style scoped>
.search-container {
  padding: 20px;
}

.w-100 {
  width: 100%;
}

.mt-5 {
  margin-top: 20px;
}
</style>
