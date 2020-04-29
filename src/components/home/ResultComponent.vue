<template>
  <div class="result-component" :style="styleStat">
    <div class="result-component-icon-space">
      <EmoticonIcon
        v-if="resultType === 'comFaleMais'"
        class="result-component-icon-element"
        :style="styleIcon"
      />
      <EmoticonSadIcon
        v-else
        class="result-component-icon-element"
        :style="styleIcon"
      />
    </div>
    <div class="result-component-info">
      <span class="result-component-title">{{ title }}</span>
      <span class="result-component-value">{{ value }}</span>
    </div>
  </div>
</template>

<script>
import EmoticonIcon from "vue-material-design-icons/Emoticon.vue";
import EmoticonSadIcon from "vue-material-design-icons/EmoticonSad.vue";
export default {
  name: "Stat",
  data() {
    return {
      valor: ""
    };
  },
  props: ["title", "resultType", "colorComponent", "colorFont", "value"],
  components: {
    EmoticonIcon,
    EmoticonSadIcon
  },
  computed: {
    styleIcon() {
      return "color: " + (this.colorFont || "#000");
    },
    styleStat() {
      return (
        "background-color: " +
        (this.colorComponent || "#000") +
        "; color: " +
        (this.colorFont || "#000")
      );
    }
  }
};
</script>

<style>
.result-component {
  flex: 1;
  display: flex;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.result-component-icon-space {
  display: flex;
  align-items: center;
}

.result-component-icon-element {
  font-size: 5rem;
  color: white;
}

.result-component-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.result-component-title {
  font-size: 1.2rem;
}

.result-component-value {
  font-size: 3rem;
}
</style>
