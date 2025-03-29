<template>
    <div>
        <button
            class="bg-white text-black text-sm md:text-base mr-2 px-2 py-1 md:px-5 md:py-2 rounded-2xl font-medium hover:bg-amber-300 transition duration-400 shadow-sm"
            @click="showLogin = true"
        >
            {{ $t('LoginComponent.button.login') }}
        </button>
        <div
            class="fixed top-0 left-0 bg-black/50 h-screen w-screen flex items-center justify-center"
            v-show="showLogin"
        >
            <XMarkIcon
                class="size-6 absolute top-3 right-3 hover:scale-150 transition ease-in-out duration-300 cursor-pointer"
                @click="showLogin = false"
            ></XMarkIcon>
            <ArrowPathIcon
                class="size-6 absolute top-3 left-3 hover:scale-150 transition ease-in-out duration-300 cursor-pointer"
                @click="isLoginForm = !isLoginForm"
            ></ArrowPathIcon>
            <div class="relative bg-penn-blue h-2/3 w-1/2 rounded-3xl overflow-hidden grid grid-cols-2">
                <div
                    class="absolute inset-0 bg-ultra-violet transform transition duration-500 rounded-3xl grid grid-cols-2"
                    :class="{ 'translate-x-1/2': isLoginForm, '-translate-x-1/2': !isLoginForm }"
                >
                    <div class="relative flex items-center justify-center">
                        <p class="text-lg text-black">{{ $t('LoginComponent.button.login') }}</p>
                        <div
                            class="absolute top-3 right-3 flex items-center justify-center"
                        >
                            <LanguageComponent v-show="isLoginForm" :is-left="true"></LanguageComponent>
                        </div>
                    </div>
                    <div class="relative flex items-center justify-center">
                        <p class="text-lg text-black">{{ $t('LoginComponent.button.regrister') }}</p>
                        <div
                            class="absolute top-3 left-3 flex items-center justify-center"
                        >
                            <LanguageComponent v-show="!isLoginForm" :is-left="false"></LanguageComponent>
                        </div>
                    </div>
                </div>
                <!-- Login Form -->
                <div class="flex items-center justify-center">
                    <div class="w-4/5 grid grid-cols-1 grid-rows-5 gap-3">
                        <div>
                            <p class="text-2xl">{{ $t('LoginComponent.label.login').toUpperCase() }}</p>
                        </div>
                        <div class="col-span-1 row-span-1 flex flex-col">
                            <label class="text-white font-medium text-left mb-1">
                                {{ $t('LoginComponent.label.account') }}
                            </label>
                            <input
                                class="bg-white text-black px-4 py-1 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gamboge focus:ring-opacity-50 placeholder:text-sm"
                                type="text"
                                :placeholder="$t('LoginComponent.input.account')"
                                v-model="accountLogin"
                            />
                        </div>
                        <div class="col-span-1 row-span-1 flex flex-col">
                            <label class="text-white font-medium text-left mb-1">
                                {{ $t('LoginComponent.label.password') }}
                            </label>
                            <input
                                class="bg-white text-black px-4 py-1 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gamboge focus:ring-opacity-50 placeholder:text-sm"
                                type="password"
                                :placeholder="$t('LoginComponent.input.password')"
                                v-model="passwordLogin"
                            />
                        </div>
                        <div class="col-span-1 row-span-1 flex justify-center items-center w-full">
                            <button
                                class="bg-gamboge text-prussian-blue px-2 py-1 rounded-2xl font-medium w-1/2 h-3/4 self-center hover:bg-prussian-blue hover:text-gamboge hover:ring-2 hover:ring-gamboge hover:ring-opacity-50 transition duration-400"
                                @click="btnLogin_Click"
                            >
                                {{ $t('LoginComponent.button.login') }}
                            </button>
                        </div>
                        <div class="items-center justify-center grid grid-rows-2 gap-2">
                            <div class="flex justify-center items-center w-full">
                                <p class="text-sm text-white">{{ $t('LoginComponent.button.forgotPassword') }}?</p>
                            </div>
                            <div class="grids grid-cols-2 gap-3 flex justify-center items-center w-full">
                                <GoogleIcon
                                    class="size-6 hover:scale-150 transition ease-in-out duration-300 cursor-pointer"
                                ></GoogleIcon>
                                <FacebookIcon
                                    class="size-6 hover:scale-150 transition ease-in-out duration-300 cursor-pointer"
                                ></FacebookIcon>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Register Form -->
                <div class="flex items-center justify-center">
                    <div class="w-4/5 grid grid-cols-1 grid-rows-5 gap-3">
                        <div>
                            <p class="text-2xl">{{ $t('LoginComponent.button.regrister').toUpperCase() }}</p>
                        </div>
                        <div class="col-span-1 row-span-1 flex flex-col">
                            <label class="text-white font-medium text-left mb-1">
                                {{ $t('LoginComponent.label.account') }}
                            </label>
                            <input
                                class="bg-white text-black px-4 py-1 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gamboge focus:ring-opacity-50 placeholder:text-sm"
                                type="text"
                                :placeholder="$t('LoginComponent.input.account')"
                                v-model="accountRegister"
                            />
                        </div>
                        <div class="col-span-1 row-span-1 flex flex-col">
                            <label class="text-white font-medium text-left mb-1">
                                {{ $t('LoginComponent.label.password') }}
                            </label>
                            <input
                                class="bg-white text-black px-4 py-1 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gamboge focus:ring-opacity-50 placeholder:text-sm"
                                type="password"
                                :placeholder="$t('LoginComponent.input.password')"
                                v-model="passwordRegister"
                            />
                        </div>
                        <div class="col-span-1 row-span-1 flex justify-center items-center w-full">
                            <button
                                class="bg-gamboge text-prussian-blue px-2 py-1 rounded-2xl font-medium w-1/2 h-3/4 self-center hover:bg-prussian-blue hover:text-gamboge hover:ring-2 hover:ring-gamboge hover:ring-opacity-50 transition duration-400"
                                @click="btnRegrister_Click"
                                >
                                {{ $t('LoginComponent.button.regrister') }}
                            </button>
                        </div>
                        <div class="items-center justify-center grid grid-rows-2 gap-2">
                            <div class="grids grid-cols-2 gap-3 flex justify-center items-center w-full">
                                <GoogleIcon
                                    class="size-6 hover:scale-150 transition ease-in-out duration-300 cursor-pointer"
                                ></GoogleIcon>
                                <FacebookIcon
                                    class="size-6 hover:scale-150 transition ease-in-out duration-300 cursor-pointer"
                                ></FacebookIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, reactive } from 'vue'
import { ArrowPathIcon, XMarkIcon } from '@heroicons/vue/16/solid'
import GoogleIcon from '../../assets/icons/GoogleIcon.vue'
import FacebookIcon from '../../assets/icons/FacebookIcon.vue'
import LanguageComponent from '../header/LanguageComponent.vue'
import { useValidation } from '../../stores/mixin/validate_form'
import Swal from 'sweetalert2'
import { post } from '../../stores/http/http'

const { t } = useI18n()
const { validateForm } = useValidation()

const showLogin = ref(false)
const isLoginForm = ref(true)
const accountLogin = ref('')
const passwordLogin = ref('')
const accountRegister = ref('')
const passwordRegister = ref('')

interface ErrorType {
    account: string; 
    password: string;
}

const error = reactive<ErrorType>({
    account: '',
    password: ''
})

const btnLogin_Click = async (): Promise<void> => {
    if (!validateLogin()) {
        Swal.fire({
            icon: 'error',
            title: t('LoginComponent.message.loginFail.title'),
            text: t('LoginComponent.message.loginFail.content')
        })
        return
    }
    try {
        const loginInfo = {
            username: accountLogin.value,
            password: passwordLogin.value
        }
        const response = await post('/api/v1/auth/login', loginInfo)
        if (response.status === 200) {
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: t('LoginComponent.message.loginSuccess.title'),
                    text: t('LoginComponent.message.loginSuccess.content')
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: t('LoginComponent.message.loginFail.title'),
                    text: t('LoginComponent.message.loginFail.content')
                })
            }
        } else {
            
        }
    } catch (error) {
        
    }
}
const validateLogin = (): boolean => {
    const formRule = {
        account: {
            required: true,
        },
        password: {
            required: true,
        }
    }
    const formData = {
        account: accountLogin.value,
        password: passwordLogin.value,
    }
    Object.assign(error, validateForm(formRule, formData))
    for (let key in error) {
        if (!error[key as keyof ErrorType] === false) return false
    }
    return true
}
const btnRegrister_Click = (): void => {
    console.log(accountRegister.value, passwordRegister.value)
}
</script>
<style lang="css" scoped></style>
