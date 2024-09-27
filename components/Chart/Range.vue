<script setup>
const emit = defineEmits(['update:modelValue'])

const sliderValue = ref(75)
const slider = ref(null)

function getProgress(value, min, max) {
  return ((value - min) / (max - min)) * 100
}

function setCSSProgress(progress) {
  slider.value.style.setProperty('--ProgressPercent', `${progress}%`)
}

watchEffect(() => {
  if (slider.value) {
    emit('update:modelValue', sliderValue.value)
    const progress = getProgress(sliderValue.value, 0, 100)
    setCSSProgress(progress)
  }
})
</script>

<template>
  <div class="custom-slider">
    <input
      ref="slider"
      v-model="sliderValue"
      type="range"
      min="0"
      max="100"
      step="1"
      class="slider"
      @input="({ target }) => (sliderValue = parseFloat(target.value))"
    >
  </div>
</template>

<style lang="scss" scoped>
.custom-slider {
  --trackHeight: 0.5rem;
  --thumbRadius: 1rem;
  --innerCircleRadius: 0.5rem;
  width: 100%; /* Ensure the custom-slider container is 100% width */
}

.custom-slider input[type="range"] {
  position: relative;
  appearance: none;
  border-radius: 999px;
  width: 100%; /* Make the input element 100% width */
}

.custom-slider input[type="range"]::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: calc(var(--ProgressPercent, 100%) - var(--thumbRadius) / 2);
  height: 100%;
  background: #2ABF7D;
  pointer-events: none;
  border-radius: 999px;
}

/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: #343434;
  height: var(--trackHeight);
  border-radius: 999px;
}

/* `::-moz-range-track` targets the track (background) of a range slider in Mozilla Firefox. */
.custom-slider input[type="range"]::-moz-range-track {
  appearance: none;
  background: #005a3c;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background: white;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}

.custom-slider input[type="range"]::-webkit-slider-thumb::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--innerCircleRadius);
  height: var(--innerCircleRadius);
  background: #00bd7e;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.custom-slider input[type="range"]::-moz-range-thumb {
  position: relative;
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  background: white;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}

.custom-slider input[type="range"]::-moz-range-thumb::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--innerCircleRadius);
  height: var(--innerCircleRadius);
  background: #00bd7e;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
