import ANIMATE_TIMING from "./easing";

class QueueFn {
  constructor() {
    this.fns = [];
  }
  addFn(fn) {
    this.fns.push(fn);
  }
  queue() {
    let cur = 0;

    const next = () => {
      let fn = this.fns[cur++];
      if (fn) {
        fn(next);
      }
    };
    next();
  }
}

export default {
  computed: {
    defaultAnimation() {
      return {
        type: "to", // from/to
        duration: 450,
        delay: 0,
        repeat: 0,
        repeatDelay: 0,
        ease: "easeInOutQuad"
      };
    }
  },
  methods: {
    delay(time) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    },
    getComputedStyle() {
      return document.defaultView.getComputedStyle(this.$el);
    },

    async setAnimation() {
      let animation = Object.assign({}, this.defaultAnimation, this.animation);
      let style = this.getComputedStyle();
      let type = animation.type;
      let duration = animation.duration;
      let delay = animation.delay;
      let repeat = animation.repeat || 1;
      let repeatDelay = animation.repeatDelay;
      let ease = animation.ease;

      ["type", "duration", "delay", "repeat", "repeatDelay", "ease"].forEach(
        key => {
          delete animation[key];
        }
      );

      let el = this.$el;
      let from = +style["opacity"];
      console.log(style.transform)

      function draw(progress) {
        Object.keys(animation).forEach(p => {
          if (p === "x" || p === "y") {
            el.style.transform = `translate${p.toLowerCase()}(${progress *
              parseFloat(animation[p])}px)`;
          } else {
            el.style[p] = progress * (animation[p] - from) + from;
          }
        });
      }

      const ticker = next => {
        this.animate({
            duration,
            timing: ANIMATE_TIMING[ease] || ANIMATE_TIMING.easeInOutQuad,
            draw,
            repeatDelay
          },
          next
        );
      };

      let i = 0;
      let queue = new QueueFn();
      while (i < repeat) {
        queue.addFn(ticker);
        i++;
      }
      if (delay) {
        await this.delay(delay);
      }
      queue.queue();
    },
    animate({
        duration,
        timing = ANIMATE_TIMING.easeInOutQuad,
        draw,
        repeatDelay
      },
      next
    ) {
      let start = performance.now();
      let self = this;
      requestAnimationFrame(async function animate(time) {
        let timeProgress = (time - start) / duration;
        if (timeProgress > 1) {
          timeProgress = 1;
        }
        let progress = timing(timeProgress);
        draw(progress);
        if (timeProgress < 1) {
          requestAnimationFrame(animate);
        } else {
          if (repeatDelay) await self.delay(repeatDelay);
          next && next();
        }
      });
    }
  }
};
