<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- Número de Serie -->
      <v-text-field
        label="Número de Serie"
        v-model="curso.numeroSerie"
        :rules="[rules.required]"
      ></v-text-field>

      <!-- Clave Materia -->
      <v-text-field
        label="Clave Materia"
        v-model="curso.claveMateria"
        :rules="[rules.required]"
      ></v-text-field>

      <!-- Nombre Materia -->
      <v-text-field
        label="Nombre Materia"
        v-model="curso.nombreMateria"
        :rules="[rules.required]"
      ></v-text-field>

      <!-- Créditos -->
      <v-text-field
        label="Créditos"
        v-model="curso.creditos"
        type="number"
        :rules="[rules.required, rules.numeric]"
      ></v-text-field>

      <!-- Tipo -->
      <v-select
        label="Tipo"
        v-model="curso.tipo"
        :items="['obligatorio', 'optativo']"
        :rules="[rules.required]"
      ></v-select>

      <!-- Departamento -->
      <v-select
        label="Departamento"
        v-model="curso.Departamento"
        :items="['Matemáticas', 'Computación', 'Física', 'Química', 'Biología']"
        :rules="[rules.required]"
      ></v-select>

      <!-- Botón para enviar -->
      <v-btn color="blue" dark @click="submitForm">
        Guardar Curso
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const valid = ref(false);
const curso = ref({
  numeroSerie: '',
  claveMateria: '',
  nombreMateria: '',
  creditos: null,
  tipo: '',
  Departamento: '',
});

const rules = {
  required: (value) => !!value || 'Este campo es requerido.',
  numeric: (value) => !isNaN(value) || 'Debe ser un número válido.',
};

const submitForm = async () => {
  const formValid = validateForm();
  if (formValid) {
    try {
      const response = await axios.post('http://localhost:3000/cursos', curso.value);
      console.log('Curso creado:', response.data);
      router.push('/cursos'); // Redirige al listado de cursos
    } catch (error) {
      console.error('Error al crear curso:', error);
    }
  }
};

const validateForm = () => {
  let isValid = true;
  Object.keys(rules).forEach((key) => {
    const rule = rules[key];
    const field = curso.value[key];
    if (rule && !rule(field)) {
      isValid = false;
    }
  });
  return isValid;
};
</script>
