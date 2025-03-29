<template>
    <div class="inline-block">
        <button
            @click="toggleDropdown"
            class="text-sm md:text-base px-1 py-1 md:px-2 md:py-2 rounded-full bg-white text-white flex items-center justify-center shadow-lg hover:bg-amber-300 transition"
        >
            <GlobeAsiaAustraliaIcon class="size-5 md:size-6" v-if="currentLang == 'vi'"></GlobeAsiaAustraliaIcon>
            <GlobeAmericasIcon class="size-5 md:size-6" v-if="currentLang == 'en'"></GlobeAmericasIcon>
        </button>

        <!-- Dropdown chọn ngôn ngữ -->
        <transition name="fade">
            <div
                v-if="isOpen"
                class="absolute right-0 mt-2.5 w-40 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                :class="{ 'translate-x-30' : !props.isLeft }"
                >
                <ul class="py-2">
                    <li
                        v-for="lang in languages"
                        :key="lang.code"
                        @click="selectLanguage(lang)"
                        class="px-4 py-2 hover:bg-gray-400 cursor-pointer text-black"
                    >
                        {{ lang.label }}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { GlobeAmericasIcon, GlobeAsiaAustraliaIcon } from '@heroicons/vue/16/solid'
import { ref } from 'vue'

const { t, locale } = useI18n()

const props = defineProps<{
    isLeft: boolean
}>()
const isOpen = ref(false)
const currentLang = ref('vi')
const languages = [
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' },
]

function toggleDropdown(): void {
    isOpen.value = !isOpen.value
}

function selectLanguage(lang: { code: any }): void {
    currentLang.value = lang.code
    locale.value = lang.code
    isOpen.value = false
}
</script>
