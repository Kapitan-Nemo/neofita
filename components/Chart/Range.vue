<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const financeGoal = firebaseStore.financeGoal

const sliderValue = computed(() => {
  return (financeGoal.collected / financeGoal.goal) * 100
})

function setCSSProgress(progress: number) {
  const progressBar = document.querySelector('.progress-bar') as HTMLElement
  if (progressBar) {
    progressBar.style.setProperty('--ProgressPercent', `${progress}%`)
  }
}

onMounted(async () => {
  await firebaseStore.fetchFinanceGoal()
  watchEffect(() => {
    const progress = sliderValue.value
    setCSSProgress(progress)
  })
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <p class="text-2xl mb-2">
        {{ formatNumber(financeGoal.collected) }}<span class="text-sm text-gray-200"><span class="mx-1">of</span>{{ formatNumber(financeGoal.goal) }} </span>
      </p>
      <small class="text-green">{{ sliderValue.toFixed(2) }}% Completed </small>
    </div>
  </div>

  <div class="custom-progress">
    <div class="progress-bar" />
  </div>
</template>

<style lang="scss" scoped>
.custom-progress {
  --trackHeight: 0.5rem;
  --ProgressPercent: 0%;
  width: 100%; /* Ensure the custom-progress container is 100% width */
  background: #343434;
  height: var(--trackHeight);
  border-radius: 999px;
  position: relative;
}

.progress-bar {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: var(--ProgressPercent);
  height: 100%;
  background: #2ABF7D;
  border-radius: 999px;
}
</style>
