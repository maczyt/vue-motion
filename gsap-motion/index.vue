<template>
  <div class="gsap-motion">
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
      type: [Object, Array],
      required: true
    },
    paused: {
      type: Boolean,
      default: false
    },

    // animation is array
    duration: {
      type: Number,
      default: 1
    },
    repeat: {
      type: Number
    },
    yoyo: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    paused(val) {
      if (val) {
        if (!this.timeline._paused) {
          this.timeline.pause();
        }
      } else {
        if (this.timeline._paused) {
          this.timeline.resume();
        }
      }
    }
  },

  mounted() {
    let { animation, paused } = this;
    animation = [].concat(animation);

    this.timeline = animation.reduce(
      (TM, animate) => {
        return TM[animate.type || "to"](
          this.$el,
          animate.duration || this.duration,
          animate
        );
      },
      new TimelineMax({
        repeat: this.repeat,
        yoyo: this.yoyo
      })
    );

    if (this.paused) {
      this.timeline.pause();
    }
  },
  destroyed() {
    this.timeline.kill();
    this.timeline = null;
  }
};
</script>

<style lang="less" scoped>
.gsap-motion {
  display: table;
}
</style>
