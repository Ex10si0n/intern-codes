<script setup lang="ts">
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import countries from "../store/countries"

const store = useStore()
const name = computed(() => store.state.name)

</script>

<template>
  <div class="items-center px-4 py-6">
    <div class="min-w-full max-w-md px-3 py-3 justify-center bg-green-400 shadow-md">
      <div class="text-md text-gray-700">
        健康码
      </div>
    </div>
    <div class="min-w-full max-w-md px-3 py-1 justify-center bg-gray-200 shadow-md">
      <div class="text-sm text-gray-700">
        个人信息
      </div>
    </div>
    <div v-if="name" class="min-w-full max-w-md px-3 py-1 justify-center bg-white shadow-md">
      <div class="text-sm text-gray-700">
        <div class="py-1">
          <div class="text-sm my-2">
            <span>姓名：{{ name }}</span>
          </div>
        </div>
        <img v-if="name" class="object-center" src="
          https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={{ name }}
        ">
      </div>
    </div>

  </div>
</template>