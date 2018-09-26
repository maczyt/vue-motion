<template>
  <div class="tween-group">
    <slot />
  </div>
</template>


<script>
import { TimelineMax } from "gsap/TweenMax";

export default {
  data() {
    return {
      timeline: null
    };
  },
  props: {
    animation: {
      type: Array,
      required: true
    }
  },
  mounted() {
    let childEls = this.$slots.default.filter(item => item.tag !== undefined);
    childEls = childEls.map(item => item.elm);
    let index = 0;
    let animate = null;
    this.timeline = childEls.reduce(
      (TM, elm) => {
        animate = this.animation[index++];
        return TM[animate.type || "to"](
          elm,
          animate.duration || 1,
          animate.animate,
          animate.timePos
        );
      },
      new TimelineMax({
        repeat: -1
      })
    );
  }
};
</script>
