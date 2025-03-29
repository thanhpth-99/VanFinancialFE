<template>
    <header
        class="w-[calc(100%-1rem)] fixed top-0 left-0 flex items-center justify-between rounded-2xl p-4 mt-2 mx-2 bg-white text-white shadow-md"
    >
        <!-- Tiêu đề -->
        <h1 class="text-base md:text-2xl font-bold tracking-wide ml-2">VanFinancial</h1>

        <!-- Logo ở giữa -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
            <img src="../../assets/images/Logo.png" alt="VanFinancial Logo" class="h-6 md:h-12 w-auto" />
        </div>

        <div class="flex items-center justify-between">
            <!-- Login button -->
            <LoginComponent></LoginComponent>
            <!-- Select language button -->
            <LanguageComponent :is-left="true"></LanguageComponent>
        </div>
    </header>
</template>

<script setup lang="ts">
import LoginComponent from '../login/LoginComponent.vue'
import LanguageComponent from './LanguageComponent.vue'
</script>

<style scoped>
header {
    z-index: 50;
    height: 64px; /* Đảm bảo header có chiều cao cố định */
}
@media (max-width: 768px) {
    header {
        padding: 0.5rem 1rem;
        height: 56px; /* Giảm chiều cao header trên thiết bị nhỏ */
    }
}
</style>
