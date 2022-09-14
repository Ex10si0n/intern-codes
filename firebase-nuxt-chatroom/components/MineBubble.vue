<script setup>
defineProps({
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
    <li class="flex justify-end">
      <div class="pl-2 text-xs text-gray-500">{{ time }}</div>
    </li>
    <li class="flex justify-end">
      <div class="relative max-w-xl px-4 py-2 text-white bg-blue-600 rounded shadow">
        <span class="block">{{ text }}</span>
      </div>
    </li>
  </div>
</template>
