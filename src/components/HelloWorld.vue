<template>
  <div class="hello"
    @mouseenter="t = false"
    @mouseleave="t = true"
  >
    <!-- 基本动画效果 -->
    <!-- <h2>基本动画效果</h2>
    <div
      @mouseenter="t1 = false"
      @mouseleave="t1 = true"
    >
      <tween-one
        :animation="animation1"
        :paused="t1">
        <div class="ball"></div>
      </tween-one>
    </div> -->

    <h2>时间轴效果</h2>
    <div
      @mouseenter="t2 = false"
      @mouseleave="t2 = true">
      <tween-one
        yoyo
        :style="{
          position: 'relative'
        }"
        :repeat="-1"
        :animation="animation2"
        :paused="t2">
        <div class="ball"></div>
      </tween-one>
    </div>

    <!-- <tween-group
      :animation="animation3"
    >
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
    </tween-group> -->
  </div>
</template>

<script>
import TweenOne from "@/../gsap-motion";
import TweenGroup from "@/../gsap-motion/tween-group";
export default {
  data() {
    return {
      t1: true,
      animation1: {
        duration: 1,
        yoyo: true,
        repeat: -1,
        rotation: 120,
        scale: 0.5,
        x: 280
      },

      t2: true,
      animation2: [
        { left: "40%" },
        { top: "60px" },
        { scale: 0.7 },
        { scale: 1 },
        { top: 0 },
        { left: "0%" }
      ],

      animation3: [
        {
          animate: {
            y: "-=60px",
            autoAlpha: 0
          },
          type: "from"
        },
        {
          animate: {
            x: "+=60px",
            autoAlpha: 0
          },
          type: "from",
          timePos: "-=0.7"
        },
        {
          animate: {
            y: "+=60px",
            autoAlpha: 0
          },
          type: "from",
          timePos: "-=0.7"
        },
        {
          animate: {
            x: "-=60px",
            autoAlpha: 0
          },
          type: "from",
          timePos: "-=0.7"
        }
      ]
    };
  },

  components: {
    TweenOne,
    TweenGroup
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.ball {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  &:nth-child(even) {
    background-color: yellowgreen;
  }
  &:nth-child(odd) {
    background-color: rebeccapurple;
  }
  // position: absolute;

  &:nth-child(1) {
    left: 300px;
    top: 50px;
  }
  &:nth-child(2) {
    left: 350px;
    top: 100px;
  }
  &:nth-child(3) {
    left: 300px;
    top: 150px;
  }
  &:nth-child(4) {
    left: 250px;
    top: 100px;
  }
}
</style>

