<script setup lang="ts">
type Align = 'top' | 'bottom' | 'left' | 'right'

const props = withDefaults(defineProps<{
  tips: string[] | string,
  align?: Align,
  noIcon?: boolean
}>(), {
  align: 'top',
  noIcon: false
})

</script>

<template>
  <div class="tooltip-wrap">
    <i v-if="!props.noIcon" class="p-0 bi bi-question-circle-fill"></i>
    <ul v-if="Array.isArray(tips)" class="tooltip" :class="props.align">
      <li v-for="(tip, index) in props.tips" :key="index">{{ tip }}</li>
    </ul>
    <span v-else class="tooltip-single" :class="props.align">
      {{ props.tips }}
    </span>
    <slot></slot>
  </div>
</template>

<style scoped>
.tooltip-wrap {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  z-index: 10;
  min-width: 240px;
  max-width: 360px;
  padding: 12px 16px;
  text-align: left;
  background: #434c4c;
  border-radius: 8px;
  box-sizing: border-box;
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s linear;
}

.tooltip::before {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  background: #434c4c;
  transform: rotate(-45deg);
}


.tooltip-single {
  position: absolute;
  z-index: 10;
  min-width: 80px;
  max-width: 120px;
  font-size: 0.7rem;
  padding: 4px 8px;
  text-align: center;
  background: #434c4c;
  color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s linear;
}

.tooltip-single::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background: #434c4c;
  color: #fff;
  transform: rotate(-45deg);
}

.bottom {
  top: calc(100% + 7px);
  left: 50%;
  transform: translateX(-50%) scale(0);
}

.bottom::before {
  bottom: calc(100% - 7px);
  left: calc(50% - 7px);
}

.tooltip-wrap:hover .bottom {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

.top {
  bottom: calc(100% + 7px);
  left: 50%;
  transform: translateX(-50%) scale(0);
}

.top::before {
  top: calc(100% - 7px);
  left: calc(50% - 7px);
}

.tooltip-wrap:hover .top {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

.left {
  top: 50%;
  right: 25px;
  transform: translateY(-50%) scale(0);
}

.left::before {
  top: calc(50% - 7px);
  left: calc(100% - 7px);
}

.tooltip-wrap:hover .left {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}

.right {
  top: 50%;
  left: 25px;
  transform: translateY(-50%) scale(0);
}

.right::before {
  top: calc(50% - 7px);
  right: calc(100% - 7px);
}

.tooltip-wrap:hover .right {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}

.tooltip li {
  margin-left: 20px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  list-style: disc outside;
}
</style>
