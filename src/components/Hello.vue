<template>
  <div class="hello">
    <parent-slot>
      <template scope="props">
        <p>child set to be default: {{props.test}}</p>
        <p slot="header">this is header</p>
        <p slot="footer">this is footer</p>
      </template>
    </parent-slot>
  </div>
</template>

<script>
import ParentSlot from './Slot.vue'
export default {
  components: {
    ParentSlot
  }
}
</script>
