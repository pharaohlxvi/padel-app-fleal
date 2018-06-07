<template>
    <div class="ui message" :class="type">
        {{ message }}
    </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      equired: true
    }
  }
}
</script>
