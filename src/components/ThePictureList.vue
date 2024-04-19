<script setup lang="ts">
import { onMounted } from 'vue'
import { usePictureStore } from '@/stores/pictures'

import PictureItem from './PictureItem.vue'

const pictureStore = usePictureStore()

onMounted(() => {
  pictureStore.fetchImages()
})
</script>

<template>
  <div class="grid">
    <PictureItem
      v-for="imageObj in pictureStore.imagesArr"
      :key="imageObj.id"
      :image-obj="imageObj"
    />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(1, 1fr);
}

@media (width >= 430px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (width >= 600px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (width >= 768px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (width >= 1024px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
