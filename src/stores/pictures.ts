import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IImageObj {
  id: number
  pageURL: string
  type: string
  tags: string
  previewURL: string
  previewWidth: number
  previewHeight: number
  webformatURL: string
  webformatWidth: number
  webformatHeight: number
  largeImageURL: string
  imageWidth: number
  imageHeight: number
  imageSize: number
  views: number
  downloads: number
  collections: number
  likes: number
  comments: number
  user_id: number
  user: string
  userImageURL: string
}
export type TImageObjArr = IImageObj[] | []

const baseUrl = 'https://pixabay.com/api/'
const key = '43451730-8ea55189632e52f76f62ae350'
const imagesQuantity = '20'
const fullUrl = `${baseUrl}?key=${key}&per_page=${imagesQuantity}`

export const usePictureStore = defineStore('pictures', () => {
  // State
  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)
  const imagesArr = ref<TImageObjArr>([])

  // Actions
  const fetchImages = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const responseData = await fetch(fullUrl).then((response) => response.json())
      if (!responseData.hits) throw new Error('Не верная структура оъекта с данными')
      imagesArr.value = responseData.hits
    } catch (error) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return { fetchImages, imagesArr }
})
