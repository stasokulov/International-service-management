<script setup lang="ts">
import ThePictureList from '@/components/ThePictureList.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Тестовое задание для International Service Management</h1>
      <p>Технологии: Vue 3, Pinia, TypeScript, lazy loading, оптимизация загрузки изображений</p>
      <p>
        <a
          href="https://github.com/stasokulov/international-service-management-test-task/blob/main/src/test-task-text.md"
          target="_blank"
          rel="noopener"
          >Текст тестового задания</a
        >
      </p>
    </div>
  </header>

  <main>
    <ThePictureList />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 10px;
}

@media (width >= 768px) {
  header {
    p {
      font-size: 1.5em;
    }
  }

  h1 {
    font-size: 2.5em;
  }
}
</style>
