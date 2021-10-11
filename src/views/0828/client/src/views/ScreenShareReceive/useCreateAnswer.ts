export default function useCreateAnswer(): {
  pc: RTCPeerConnection;
  createAnswer: (
    offer: RTCSessionDescriptionInit
  ) => Promise<RTCSessionDescriptionInit>;
} {
  const pc = new RTCPeerConnection();

  async function createAnswer(offer: RTCSessionDescriptionInit) {
    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    return answer;
  }

  return {
    pc,
    createAnswer,
  };
}
