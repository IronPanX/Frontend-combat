<script setup lang="ts">
import { ref } from "vue";

import type {
  ScreenShareAnswerOfferMsg,
  ScreenShareIcecandidateMsg,
} from "@/tools/types";
import useCreateOffer from "./useCreateOffer";
import useSocket from "@/tools/useSocket";

const clientId = Date.now();
const { socket } = useSocket();
const { pc, createOffer } = useCreateOffer();

socket.on("screen-share", async (msg: ScreenShareAnswerOfferMsg) => {
  if (msg.type === "answer") {
    await pc.setRemoteDescription(msg.data);
    console.log("已收到 answer");
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

// async function addIceCandidate(candidate: RTCIceCandidate) {
//   await pc.addIceCandidate(candidate);
// }

const offerState = ref(false);
async function handleClick() {
  try {
    const offer = await createOffer();
    const msg: ScreenShareAnswerOfferMsg = {
      clientId,
      type: "offer",
      data: offer,
    };
    socket.emit("screen-share", msg);

    offerState.value = true;
    console.log("创建 offer", msg);
  } catch (error) {
    console.error("error", error.message);
  }
}

const shareState = ref(false);
const videoRef = ref<HTMLVideoElement>();
async function handleShareScreen() {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    for (const track of stream.getTracks()) {
      console.log("track", track);
      pc.addTrack(track);
    }

    if (videoRef.value) {
      videoRef.value.srcObject = stream;
    }
    shareState.value = true;
  } catch (error) {
    console.error("error", error.message);
  }
}
</script>

<template>
  <div class="home">
    <aside>
      <p>共享桌面（发起端）:</p>

      <section>
        <p>步骤一：选择需要共享的屏幕</p>
        <template v-if="shareState">
          <span>已选择桌面</span>
        </template>

        <template v-else>
          <button @click="handleShareScreen">选择需要共享的桌面</button>
        </template>
      </section>

      <section>
        <p>步骤二：创建 P2P 连接</p>
        <template v-if="offerState">
          <span>已创建连接</span>
        </template>

        <template v-else>
          <button @click="handleClick">创建 P2P 连接</button>
        </template>
      </section>
    </aside>
    <main>
      <video ref="videoRef" autoplay></video>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
}

aside {
  width: 300px;

  section {
    border: 1px solid black;
  }
}

main {
  flex: 1;

  video {
    max-width: 1000px;
  }
}
</style>
