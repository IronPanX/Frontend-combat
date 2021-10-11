<script setup lang="ts">
import { ref } from "vue";
import type {
  ScreenShareAnswerOfferMsg,
  ScreenShareIcecandidateMsg,
} from "@/tools/types";
import useSocket from "@/tools/useSocket";
import useCreateAnswer from "./useCreateAnswer";

const videoRef = ref<HTMLVideoElement>();
const { createAnswer, pc } = useCreateAnswer();

pc.ontrack = (ev) => {
  if (!videoRef.value) return;

  const stream = new MediaStream();
  videoRef.value.srcObject = stream;
  stream.addTrack(ev.track);
  console.log("videoRef.value", videoRef.value);
};

const clientId = Date.now();
const { socket } = useSocket();

socket.on("screen-share", async (msg: ScreenShareAnswerOfferMsg) => {
  if (msg.type === "offer") {
    try {
      const answer = await createAnswer(msg.data);

      socket.emit("screen-share", {
        clientId,
        type: "answer",
        data: answer,
      } as ScreenShareAnswerOfferMsg);

      console.log("已接收 offer", msg);
    } catch (error) {
      console.error("error", error.message);
    }
  }
});

socket.on("ice", (msg: ScreenShareIcecandidateMsg) => {
  if (msg.clientId !== clientId) {
    console.log("msg.clientId", msg.clientId);
    console.log("clientId", clientId);
    pc.addIceCandidate(msg.data);
  }
});

pc.onicecandidate = (e) => {
  console.log("candidate", e.candidate);
  if (!e.candidate) return;

  const msg: ScreenShareIcecandidateMsg = {
    clientId,
    type: "ice",
    data: e.candidate,
  };
  socket.emit("ice", msg);
};
</script>

<template>
  <p>共享桌面（接收端）</p>
  <video ref="videoRef" autoplay></video>
</template>
