// stores/modal.ts
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    activeModal: null as string | null,
  }),
  actions: {
    openModal(modalId: string) {
      this.activeModal = modalId
    },
    closeModal() {
      this.activeModal = null
    },
    isModalOpen(modalId: string) {
      return this.activeModal === modalId
    },
  },
})
