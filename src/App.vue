<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
    body {
        background-color: #D1C49C;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .is-danger {
        color: #9f3a38;
    }
</style>
