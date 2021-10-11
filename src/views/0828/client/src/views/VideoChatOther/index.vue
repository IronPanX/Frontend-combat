<script setup lang="ts">
import { ref } from "vue";
import type {
  VideoChatAnswerOfferMsg,
  VideoChatIcecandidateMsg,
} from "@/tools/types";
import useCreateAnswer from "./useCreateAnswer";
import useSocket from "@/tools/useSocket";

const otherVideoRef = ref<HTMLVideoElement>();
const { createAnswer, pc } = useCreateAnswer();

pc.ontrack = (ev) => {
  if (!otherVideoRef.value) return;

  const stream = new MediaStream();
  otherVideoRef.value.srcObject = stream;
  stream.addTrack(ev.track);
  console.log("otherVideoRef.value", otherVideoRef.value);
};

const clientId = Date.now();
const { socket } = useSocket();

socket.on("video-chat", async (msg: VideoChatAnswerOfferMsg) => {
  if (msg.type === "offer") {
    try {
      const answer = await createAnswer(msg.data);

      socket.emit("video-chat", {
        clientId,
        type: "answer",
        data: answer,
      } as VideoChatAnswerOfferMsg);

      console.log("已接收 offer", msg);
    } catch (error) {
      console.error("error", error.message);
    }
  }
});

socket.on("video-chat-ice", (msg: VideoChatIcecandidateMsg) => {
  if (msg.clientId !== clientId) {
    console.log("msg.clientId", msg.clientId);
    console.log("clientId", clientId);
    pc.addIceCandidate(msg.data);
  }
});

pc.onicecandidate = (e) => {
  console.log("candidate", e.candidate);
  if (!e.candidate) return;

  const msg: VideoChatIcecandidateMsg = {
    clientId,
    type: "ice",
    data: e.candidate,
  };
  socket.emit("video-chat-ice", msg);
};

const localVideoState = ref(false);
const hostVideoRef = ref<HTMLVideoElement>();
async function handleGetMedia() {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    for (const track of stream.getTracks()) {
      pc.addTrack(track);
    }

    if (hostVideoRef.value) {
      hostVideoRef.value.srcObject = stream;
    }
    localVideoState.value = true;
  } catch (error) {
    console.error("error", error.message);
  }
}
</script>

<template>
  <div class="container">
    <div class="video-container">
      <p>自己</p>
      <div class="button-container">
        <button v-show="!localVideoState" @click="handleGetMedia">
          获取本地视频
        </button>
      </div>

      <video ref="hostVideoRef" autoplay></video>
    </div>

    <div class="video-container">
      <p>其它人</p>
      <video ref="otherVideoRef" autoplay></video>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}

.video-container {
  flex: 1;
  display: flex;
  flex-direction: column;

  video {
    max-width: 100%;
  }
}
</style>
