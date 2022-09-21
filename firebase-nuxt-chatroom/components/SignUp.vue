<script setup>

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const emit = defineEmits(['closeSignUpWindow', 'returnUser'])

const email = ref("");
const password = ref("");
const showSignUpWindow = ref(true);
const showSignInWindow = ref(false);

const toggleSignUpWindow = () => {
  showSignUpWindow.value = !showSignUpWindow.value;
  showSignInWindow.value = !showSignInWindow.value;
};

const auth = getAuth();
const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      emit("returnUser", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

const signIn = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        const user = userCredential.user;
        emit("returnUser", user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

const handleSignUp = () => {
    signUp(email, password)
}

const handleSignIn = () => {
    signIn(email, password)
}
</script>

<template>
    <div>
        <div v-if="showSignUpWindow">
            <div class="flex items-center justify-center min-h-screen">
            <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <h3 class="text-2xl font-bold text-center">Register Account</h3>
                <div>
                    <div class="mt-4">
                        <div class="mt-4">
                            <div class="block" for="email">Email</div>
                                    <input type="text" placeholder="Email" v-model="email"
                                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        </div>
                        <div class="mt-4">
                            <div class="block">Password</div>
                                    <input type="password" placeholder="Password" v-model="password"
                                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        </div>
                        <div class="flex">
                            <button @click="handleSignUp" class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                                Account</button>
                        </div>
                        <div class="mt-6 text-grey-dark">
                            Already have an account?
                            <a class="text-blue-600 hover:underline" @click="toggleSignUpWindow">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div v-if="showSignInWindow">
            <div class="flex items-center justify-center min-h-screen">
            <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <h3 class="text-2xl font-bold text-center">Login</h3>
                <div>
                    <div class="mt-4">
                        <div class="mt-4">
                            <div class="block" for="email">Email</div>
                                    <input type="text" placeholder="Email" v-model="email"
                                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        </div>
                        <div class="mt-4">
                            <div class="block">Password</div>
                                    <input type="password" placeholder="Password" v-model="password"
                                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                        </div>
                        <div class="flex">
                            <button @click="handleSignIn" class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
