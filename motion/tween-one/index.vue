<template>
  <component
    :is="component"
  >
    <slot />
  </component>
</template>

<script>
import mixins from "../mixins";
export default {
  mixins: [mixins],
  props: {
    animation: {
      type: [Object, Array]
    },
    paused: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    },
    reverseDelay: {
      type: Number,
      default: 0
    },
    repeat: {
      type: Number,
      default: 0
    },
    yoyo: {
      type: Boolean,
      default: false
    },
    moment: {
      type: Number
    },
    component: {
      type: [Object, String],
      default: "div"
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.setAnimation();
    });
  }
};
</script>
