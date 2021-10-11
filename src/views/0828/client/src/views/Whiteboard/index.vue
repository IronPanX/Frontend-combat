<script setup lang="ts">
import { onMounted, ref } from "vue";
import _ from "lodash";

import useSocket from "@/tools/useSocket";
import Canvas from "./Canvas";

const { socket } = useSocket();
const canvasRef = ref<HTMLCanvasElement>();
onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const canvasInstance = new Canvas(canvas, socket);
  canvas.addEventListener("mousedown", canvasInstance.onMouseDown, false);
  canvas.addEventListener("mouseup", canvasInstance.onMouseUp, false);
  canvas.addEventListener("mouseout", canvasInstance.onMouseUp, false);
  canvas.addEventListener(
    "mousemove",
    _.throttle(canvasInstance.onMouseMove, 10),
    false
  );
  socket.on("drawing", canvasInstance.onDrawingEvent);
});

const WIDTH = document.documentElement.clientWidth;
const HEIGHT = document.documentElement.clientHeight;
</script>

<template>
  <div>白板（请在界面任意位置做图）</div>

  <canvas
    class="whiteboard"
    ref="canvasRef"
    :width="WIDTH"
    :height="HEIGHT"
  ></canvas>
</template>

<style lang="scss" scoped>
.whiteboard {
  border: 1px solid black;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
