<script setup lang="ts">
import {computed} from 'vue'
import {useStore} from 'vuex'
import countries from "../store/countries"

const store = useStore()
const hello = computed(() => store.state.hello)

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({length: 120}, (_, i) => currentYear - i)
})

const month = computed(() => {
  return Array.from({length: 12}, (_, i) => i + 1)
})

const day = computed(() => {
  return Array.from({length: 31}, (_, i) => i + 1)
})


</script>

<template>
  <div class="items-center px-4 py-6">
    <div class="min-w-full max-w-md px-3 py-3 justify-center bg-green-400 shadow-md">
      <div class="text-md text-gray-700">
        健康申明
      </div>
    </div>
    <div class="min-w-full max-w-md px-3 py-1 justify-center bg-gray-200 shadow-md">
      <div class="text-sm text-gray-700">
        个人信息
      </div>
    </div>
    <div class="min-w-full max-w-md px-3 py-1 justify-center bg-white shadow-md">
      <div class="py-1">
        <div class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span>姓名：</span>
        </div>
        <input class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700">
      </div>

      <div class="py-1">
        <div class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span>性别：</span>
        </div>
        <select name="gender"
                class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
          <option selected>-- 请选择 --</option>
          <option value="M">男</option>
          <option value="F">女</option>
        </select>
      </div>

      <div class="py-1">
        <div class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span>出生日期：(年 月 日)</span>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <select name="year"
                  class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
            <option selected>-- 年 --</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          <select name="month"
                  class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
            <option selected>-- 月 --</option>
            <option v-for="month in month" :key="month" :value="month">{{ month }}</option>
          </select>
          <select name="day"
                  class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
            <option selected>-- 日 --</option>
            <option v-for="day in day" :key="day" :value="day">{{ day }}</option>
          </select>

        </div>
      </div>

      <div class="py-1">
        <div class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span>入境澳门证件或身份证编号：</span>
        </div>
        <div class="text-sm text-gray-700 grid grid-cols-2 gap-2">
          <div class="col-span-1">
            <input type="checkbox">
            <span class="px-1">澳门居民身份证</span>
          </div>
          <div class="col-span-1">
            <input type="checkbox">
            <span class="px-1">入境澳门证件</span>
          </div>
        </div>
        <div class="py-2">
          <input class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700">
        </div>
      </div>

      <div class="py-1">
        <div class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span>联系电话：</span>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <select name="regionCode" class="col-span-1 w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 shadow">
            <option selected>-- 区号 --</option>
            <option v-for="region in countries.countryListAllIsoData">
              {{ region.phone_code }} - {{ region.cn }}
            </option>
          </select>
          <input class="col-span-3 w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700">
        </div>
      </div>
    </div>
    <div class="min-w-full max-w-md px-3 py-1 justify-center bg-gray-200 shadow-md">
      <div class="text-sm text-gray-700">
        您今天是否出现以下症状?
      </div>
      发烧
      干咳，乏力，咽痛，嗅(味)觉减退、腹泻或其他呼吸道症状
      没有以上症状
    </div>

    <div class="min-w-full max-w-md px-3 py-1 justify-center bg-gray-200 shadow-md">
      <div class="text-sm text-gray-700">
        您在过去14天内是否曾在无防护措施下接触新冠肺炎确诊病人?
      </div>
      是
      否
    </div>
  </div>

</template>
