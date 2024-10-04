// stores/modal.ts
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    showModal: false,
    modalContent: null as any,
  }),
  actions: {
    openModal(content: any) {
      this.showModal = true
      this.modalContent = content
    },
    closeModal() {
      this.showModal = false
      this.modalContent = null
    },
  },
})
