<template>
  <div>
    <div class="components">
      <CalcComponent />
    </div>
  </div>
</template>

<script>
import CalcComponent from "./CalcComponent.vue";
export default {
  components: {
    CalcComponent
  }
};
</script>

<style>
.components {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 30px;
}
</style>
