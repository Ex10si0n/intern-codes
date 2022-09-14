<script setup>
defineProps({
  from: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div>
    <li class="flex justify-start">
      <div class="text-xs text-gray-500">{{ from }}</div>
      <div class="pl-2 text-xs text-gray-500">{{ time }}</div>
    </li>
    <li class="flex justify-start">
      <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
        <span class="block">{{ text }}</span>
      </div>
    </li>
  </div>
</template>
