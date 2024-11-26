<script setup >
import ListCourses from '@/components/ListCourses.vue';
import addCourse from '@/components/addCourse.vue';
import AppBar from '@/components/AppBar.vue';

</script>

<template>
    <v-app>
        <AppBar/>
        <v-main class="pa-0">
            <ListCourses/>
            
        </v-main>
        <addCourse/>
    </v-app>
</template>

