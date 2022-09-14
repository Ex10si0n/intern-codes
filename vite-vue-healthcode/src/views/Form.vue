<script setup lang="ts">
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import countries from "../store/countries"
import router from "../router/router";

const store = useStore()
const checked = ref(0)

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({length: 120}, (_, i) => currentYear - i)
})

const months = computed(() => {
  return Array.from({length: 12}, (_, i) => i + 1)
})

const days = computed(() => {
  return Array.from({length: 31}, (_, i) => i + 1)
})

const name = ref('')
const gender = ref('-- 请选择 --')
const yearOfBirth = ref('-- 年 --')
const monthOfBirth = ref('-- 月 --')
const dayOfBirth = ref('-- 日 --')
const countryCode = ref('- 区号 -')
const phoneNumber = ref('')
const idNumber = ref('')

const usingMacaoID = ref(false);
const usingVisa = ref(false);

const fever = ref(false);
const cough = ref(false);
const noneSymptom = ref(false);

const contact = ref(false);
const nonContact = ref(false);

const checkSubmit = () => {
  let emptyField = [];
  checked.value = 1;
  if (!(usingMacaoID.value || usingVisa.value)) {
    // highlight the field

    emptyField.push('身份证或出入境澳门证件');
  }
  if (!(fever.value || cough.value || noneSymptom.value)) { emptyField.push('症状'); }
  if (!(contact.value || nonContact.value)) { emptyField.push('过去14天内是否接触新冠肺炎患者'); }
  if (name.value === '') { emptyField.push('姓名') }
  if (gender.value === '-- 请选择 --') { emptyField.push('性别') }
  if (yearOfBirth.value === '-- 年 --') { emptyField.push('出生年份') }
  if (monthOfBirth.value === '-- 月 --') { emptyField.push('出生月份') }
  if (dayOfBirth.value === '-- 日 --') { emptyField.push('出生日期') }
  if (countryCode.value === '- 区号 -') { emptyField.push('电话区号') }
  if (phoneNumber.value === '') { emptyField.push('电话号码') }
  if (idNumber.value === '') { emptyField.push('证件号') }
  if (emptyField.length > 0) {
    alert('请填写以下信息：' + emptyField.join(', '))
    return false;
  }
  return true;
}

const save = () => {
  if (checkSubmit()) {
    const payload = {
      "name": name.value,
      "IdType": usingMacaoID.value ? "MacaoID" : "Visa",
      "fever": fever.value,
      "cough": cough.value,
      "noneSymptom": noneSymptom.value,
      "haveContact": contact.value ? true : false,
      "gender": gender.value,
      "yearOfBirth": yearOfBirth.value,
      "monthOfBirth": monthOfBirth.value,
      "dayOfBirth": dayOfBirth.value,
      "countryCode": countryCode.value,
      "phoneNumber": phoneNumber.value,
      "idNumber": idNumber.value
    }
    store.commit('save', payload)
    router.push('/code')

  }
}

const clearAll = () => {
  usingMacaoID.value = false;
  usingVisa.value = false;
  fever.value = false;
  cough.value = false;
  noneSymptom.value = false;
  contact.value = false;
  nonContact.value = false;

  name.value = ''
  gender.value = '-- 请选择 --'
  yearOfBirth.value = '-- 年 --'
  monthOfBirth.value = '-- 月 --'
  dayOfBirth.value = '-- 日 --'
  countryCode.value = '- 区号 -'
  phoneNumber.value = ''
  idNumber.value = ''
}

const checkID = (id: number) => {
  if (id === 1) {
    usingMacaoID.value = true
    usingVisa.value = false
  }
  if (id === 2) {
    usingMacaoID.value = false
    usingVisa.value = true
  }
}

const checkSymptom = (symptom: number) => {
  if (symptom === 1) {
    fever.value = true
    noneSymptom.value = false
  }
  if (symptom === 2) {
    cough.value = true
    noneSymptom.value = false
  }
  if (symptom === 3) {
    fever.value = false
    cough.value = false
    noneSymptom.value = true
  }
}

const checkContact = (stat: number) => {
  if (stat === 1) {
    contact.value = true
    nonContact.value = false
  }
  if (stat === 2) {
    contact.value = false
    nonContact.value = true
  }
}

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
        <input v-if="checked === 1 && name === ''" v-model="name" class="w-full h-12 border-red-500 border-2 p-3 rounded text-md text-gray-700">
        <input v-else v-model="name" class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700">
      </div>

      <div class="py-1">
        <div class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span>性别：</span>
        </div>
        <select v-if="checked === 1 && gender ==='-- 请选择 --'" name="gender"
                v-model="gender"
                class="w-full h-12 border-red-500 border-2 p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
          <option selected>-- 请选择 --</option>
          <option value="M">男</option>
          <option value="F">女</option>
        </select>
        <select v-else name="gender"
                v-model="gender"
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

          <select v-if="checked === 1 && yearOfBirth === '-- 年 --'" name="yearOfBirth"
                  v-model="yearOfBirth"
                  class="h-12 border-red-500 border-2 p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
            <option selected>-- 年 --</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          <select v-else name="year"
                  v-model="yearOfBirth"
                  class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
            <option selected>-- 年 --</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>

          <select v-if="checked === 1 && monthOfBirth === '-- 月 --'" name="month"
                  v-model="monthOfBirth"
                  class="w-full h-12 border-red-500 border-2 p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
            <option selected>-- 月 --</option>
            <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
          </select>
          <select v-else name="month"
                  v-model="monthOfBirth"
                  class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
            <option selected>-- 月 --</option>
            <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
          </select>

          <select v-if="checked === 1 && dayOfBirth === '-- 日 --'" name="day"
                  v-model="dayOfBirth"
                  class="w-full h-12 border-red-500 border-2 p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
            <option selected>-- 日 --</option>
            <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
          </select>

          <select v-else name="day"
                  v-model="dayOfBirth"
                  class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 border shadow">
            <option selected>-- 日 --</option>
            <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
          </select>

        </div>
      </div>

      <div class="py-1">
        <div v-if="checked === 1 && !(usingMacaoID || usingVisa)" class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span class="text-red-600">入境澳门证件或身份证编号：</span>
        </div>

        <div v-else class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span>入境澳门证件或身份证编号：</span>
        </div>
        <div class="text-sm text-gray-700 grid grid-cols-2 gap-2">
          <div class="col-span-1" @click="checkID(1)">
            <input type="checkbox" v-model="usingMacaoID">
            <span class="px-1">澳门居民身份证</span>
          </div>
          <div class="col-span-1" @click="checkID(2)">
            <input type="checkbox" v-model="usingVisa">
            <span class="px-1">入境澳门证件</span>
          </div>
        </div>
        <div class="py-2" v-if="usingVisa || usingMacaoID">
          <input v-if="checked && idNumber === ''" v-model="idNumber" class="w-full h-12 border-red-500 border-2 p-3 rounded text-md text-gray-700">
          <input v-else v-model="idNumber" class="w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700">
        </div>
      </div>

      <div class="py-1">
        <div v-if="checked === 1 && (countryCode === '- 区号 -'||phoneNumber === '')" class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span class="text-red-600">联系电话：</span>
        </div>
        <div v-else class="text-sm my-2">
          <span class="text-red-600 pr-1">*</span>
          <span>联系电话：</span>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <select v-model="countryCode" name="regionCode" class="col-span-1 w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700 bg-slate-100 shadow">
            <option selected>- 区号 -</option>
            <option v-for="region in countries.countryListAllIsoData">
              {{ region.phone_code }} - {{ region.cn }}
            </option>
          </select>
          <input v-model="phoneNumber" class="col-span-3 w-full h-12 border-gray-200 border p-3 rounded text-md text-gray-700">
        </div>
      </div>
    </div>
    <div class="min-w-full max-w-md px-3 py-1 justify-center bg-gray-200 shadow-md">
      <div v-if="checked === 1 && !(cough || fever || noneSymptom)" class="text-sm text-red-600 font-bold">
        您今天是否出现以下症状?
      </div>
      <div v-else class="text-sm text-gray-700">
        您今天是否出现以下症状?
      </div>
    </div>

    <div class="min-w-full max-w-md px-3 py-3 justify-center bg-white shadow-md">
      <div class="py-1" @click="checkSymptom(1)">
        <input type="checkbox" v-model="fever">
        <span class="px-1 text-sm text-gray-700">发烧</span>
      </div>
      <div class="py-1" @click="checkSymptom(2)">
        <input type="checkbox" v-model="cough">
        <span class="px-1 text-sm text-gray-700">干咳，乏力，咽痛，嗅(味)觉减退、腹泻或其他呼吸道症状</span>
      </div>
      <div class="py-1" @click="checkSymptom(3)">
        <input type="checkbox" v-model="noneSymptom">
        <span class="px-1 text-sm text-gray-700">没有以上症状</span>
      </div>
    </div>

    <div class="min-w-full max-w-md px-3 py-1 justify-center bg-gray-200 shadow-md">
      <div v-if="checked === 1 && !(contact || nonContact)" class="text-sm text-red-600 font-bold">
        您在过去14天内是否曾在无防护措施下接触新冠肺炎确诊病人?
      </div>
      <div v-else class="text-sm text-gray-700">
        您在过去14天内是否曾在无防护措施下接触新冠肺炎确诊病人?
      </div>
    </div>
    <div class="min-w-full max-w-md px-3 py-3 justify-center bg-white shadow-md">
      <div class="py-1" @click="checkContact(1)">
        <input type="checkbox" v-model="contact">
        <span class="px-1 text-sm text-gray-700">是</span>
      </div>
      <div class="py-1" @click="checkContact(2)">
        <input type="checkbox" v-model="nonContact">
        <span class="px-1 text-sm text-gray-700">否</span>
      </div>
    </div>
    <div class="min-w-full max-w-md px-3 py-1 justify-center bg-white shadow-md">
      <div class="grid grid-cols-2 gap-2">
        <button class="col-span-1 my-2 py-2 border rounded" @click="clearAll()">重置</button>
        <button class="col-span-1 my-2 py-2 border rounded bg-blue-400 text-white" @click="save">下一步</button>
      </div>
    </div>
  </div>
</template>