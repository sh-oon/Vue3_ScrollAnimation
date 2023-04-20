<template>
  <div class="scroll-component" ref="scrollComponent">
    <div class="scroll-component__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps } from "vue";
const scrollComponent = ref(null);
const props = defineProps({
  threshold: {
    type: Number,
    default: 0.5,
  },
  animation: {
    type: String,
    default: "fade",
  },
  animationDelay: {
    type: Number,
    default: 0,
  },
  animationDuration: {
    type: Number,
    default: 1000,
  },
  animationEasing: {
    type: String,
    default: "ease",
  },
  animationOffset: {
    type: Number,
    default: 0,
  },
  animationRepeat: {
    type: Boolean,
    default: false,
  },
  animationRepeatDelay: {
    type: Number,
    default: 0,
  },
  animationRepeatDuration: {
    type: Number,
    default: 1000,
  },
  animationRepeatEasing: {
    type: String,
    default: "ease",
  },
  animationRepeatOffset: {
    type: Number,
    default: 0,
  },
});

onMounted(() => {
  const animationComponent = reactive({
    acNodes: [],
    threshold: 0.1,
    setThreshold: (threshold) => {
      if (typeof threshold === "string") {
        threshold = threshold.trim();
        if (threshold === "") {
          console.warn("Threshold is empty string. Setting to 0.1");
        }
        if (!isFinite(Number(threshold))) {
          console.warn("Threshold is not a number. Setting to 0.1");
          threshold = 0.1;
        }
        threshold = Number(threshold);
      }
      if (typeof threshold !== "number") {
        console.warn(`${threshold} is not a number. Setting to 0.1`);
        threshold = 0.1;
      }
      if (threshold < 0 || threshold > 1) {
        console.warn(`${threshold} is not between 0 and 1. Setting to 0.1`);
        threshold = 0.1;
      }
      animationComponent.threshold = threshold;
    },
    intersection: () => {
      if (animationComponent.acNodes && animationComponent.acNodes.length) {
        for (const acNode of animationComponent.acNodes) {
          io.observe(acNode);
        }
      }
    },
    init: (threshold) => {
      const node = scrollComponent.value;
      if (!node) {
        throw new Error("ScrollComponent is not mounted");
      }
      animationComponent.acNodes = [node];
      if (!threshold !== undefined) {
        animationComponent.setThreshold(threshold);
      }
      animationComponent.intersection();
    },
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entry);
      });
    },
    {
      root: scrollComponent.value,
      threshold: props.threshold || 0.5,
    }
  );
  console.log(io);
});
</script>
<style lang="scss">
.scroll-component {
  position: relative;
  overflow: hidden;

  .scroll-component__content {
    position: relative;
    z-index: 2;
  }
}
</style>
