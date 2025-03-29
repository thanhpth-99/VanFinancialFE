<template>
    <HeaderComponent></HeaderComponent>

    <!-- Thêm phần nội dung mẫu để kiểm tra -->
    <main class="mt-20 p-4">
        <p>Nội dung trang sẽ hiển thị ở đây mà không bị che khuất bởi header.</p>
    </main>
</template>

<script setup lang="ts">
import HeaderComponent from '../components/header/HeaderComponent.vue'
</script>

<style scoped>
main {
    margin-top: 64px; /* Thêm khoảng trống tương ứng với chiều cao của header */
}
@media (max-width: 768px) {
    main {
        margin-top: 56px; /* Cập nhật khoảng trống tương ứng */
    }
}
</style>
