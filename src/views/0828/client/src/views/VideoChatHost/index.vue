<script setup lang="ts">
// 1. 获取本地视频数据
// 2. 渲染本地视频数
// 3. 建立 P2P 连接
// 4. 交换 SDP
// 5. 添加对方的 ice
// 6. 渲染对方视频

import { ref } from "vue";

import type {
  VideoChatAnswerOfferMsg,
  VideoChatIcecandidateMsg,
} from "@/tools/types";
import useCreateOffer from "./useCreateOffer";
import useSocket from "@/tools/useSocket";

const clientId = Date.now();
const { socket } = useSocket();
const { pc, createOffer } = useCreateOffer();

const otherVideoRef = ref<HTMLVideoElement>();
pc.ontrack = (ev) => {
  if (!otherVideoRef.value) return;

  const stream = new MediaStream();
  otherVideoRef.value.srcObject = stream;
  stream.addTrack(ev.track);
  console.log("otherVideoRef.value", otherVideoRef.value);
};

socket.on("video-chat", (msg: VideoChatAnswerOfferMsg) => {
  if (msg.type === "answer") {
    pc.setRemoteDescription(msg.data);
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
  if (!e.candidate) return;

  const msg: VideoChatIcecandidateMsg = {
    clientId,
    type: "ice",
    data: e.candidate,
  };
  socket.emit("video-chat-ice", msg);
};

const offerState = ref(false);
async function handleCreateOffer() {
  try {
    const offer = await createOffer();
    const msg: VideoChatAnswerOfferMsg = {
      clientId,
      type: "offer",
      data: offer,
    };
    socket.emit("video-chat", msg);

    offerState.value = true;
    console.log("创建 offer", msg);
  } catch (error) {
    console.error("error", error.message);
  }
}

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
          步骤一：获取本地视频
        </button>
        <button v-show="!offerState" @click="handleCreateOffer">
          步骤二：建立 p2p 链接
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

  .button-container {
    button {
      width: 200px;
      margin-right: 20px;
    }
  }

  video {
    max-width: 100%;
  }
}
</style>
