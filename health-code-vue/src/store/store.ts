import { createStore } from 'vuex'

export default createStore({
    state: {
        name: '',
        IdType: '',
        fever: '',
        cough: '',
        noneSymptom: '',
        haveContact: '',
        gender: '',
        yearOfBirth: '',
        monthOfBirth: '',
        dayOfBirth: '',
        countryCode: '',
        phoneNumber: '',
        idNumber: ''
    },
    mutations: {
        save(state, payload) {
            state.name = payload.name
            state.IdType = payload.IdType
            state.fever = payload.fever
            state.cough = payload.cough
            state.noneSymptom = payload.noneSymptom
            state.haveContact = payload.haveContact
            state.gender = payload.gender
            state.yearOfBirth = payload.yearOfBirth
            state.monthOfBirth = payload.monthOfBirth
            state.dayOfBirth = payload.dayOfBirth
            state.countryCode = payload.countryCode
            state.phoneNumber = payload.phoneNumber
            state. idNumber =payload.idNumber
        }
    },
    actions: {}
})