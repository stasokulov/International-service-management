<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { type IImageObj } from '@/stores/pictures'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const props = defineProps<{
  imageObj: IImageObj
}>()

const isPreviewLoaded = ref<boolean>(false)
const isFullSizeOpen = ref<boolean>(false)
const isNeedLargeImg = ref<boolean>(false)

const alt = computed(() => props.imageObj?.tags ?? 'Нет описания картинки')

const setIsPreviewloaded = (): void => {
  isPreviewLoaded.value = true
}
const setIsFullSizeState = (bool: boolean): void => {
  isFullSizeOpen.value = bool
  if (bool && !isNeedLargeImg.value) {
    // Откладываем начало загрузки картинки в следующую макрозадачу для обхода бага с потерей изображения при одновременном ресайзе верстки и замене src картинки.
    setTimeout(async () => {
      await nextTick()
      isNeedLargeImg.value = true
    }, 0)
  }
}
</script>

<template>
  <div class="item" @click="setIsFullSizeState(true)">
    <div class="item__img-wrapper">
      <picture>
        <!-- Загружаем картинку среднего размера после того как загрузилось превью -->
        <source v-if="isPreviewLoaded" :srcset="props.imageObj.webformatURL" />
        <img
          :alt="alt"
          class="item__img"
          :src="props.imageObj.previewURL"
          loading="lazy"
          @load.once="setIsPreviewloaded"
        />
      </picture>
    </div>
    <div class="item__details">
      <div class="item__detail">
        <HeartIcon class="item__icon" />
        {{ props.imageObj.likes }}
      </div>
      <div class="item__detail">
        <EyeIcon class="item__icon" />
        {{ props.imageObj.views }}
      </div>
    </div>
  </div>

  <Transition>
    <div v-if="isFullSizeOpen" class="item-full-size">
      <CloseIcon class="item-full-size__close-icon" @click="setIsFullSizeState(false)" />
      <div class="item-full-size__img-wrapper">
        <picture>
          <!-- Загружаем большую картинку для полноэкранного просмотра только для устройств с экраном шире 430px -->
          <source
            v-if="isNeedLargeImg"
            :srcset="props.imageObj.largeImageURL"
            media="(width > 430px)"
          />
          <source :srcset="props.imageObj.webformatURL" />
          <img :alt="alt" class="item-full-size__img" :src="props.imageObj.previewURL" />
        </picture>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.item {
  border: 1px solid #333;
  width: 100%;
  cursor: pointer;
}

.item__img-wrapper {
  aspect-ratio: 1 / 1;
}

.item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item__details {
  display: flex;
  column-gap: 10px;
  padding: 5px;
}

.item__detail {
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.item__icon {
  width: 20px;
}

/* Картинка навесь экран */
.item-full-size {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  display: flex;
}

.item-full-size__close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.item-full-size__img-wrapper {
  width: 100%;
  height: 100%;
  margin: auto;
}

.item-full-size__img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
