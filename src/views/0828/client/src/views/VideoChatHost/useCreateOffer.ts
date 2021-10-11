export default function useCreateOffer(): {
  pc: RTCPeerConnection;
  createOffer: () => Promise<RTCSessionDescriptionInit>;
} {
  const pc = new RTCPeerConnection({});

  async function createOffer() {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    return offer;
  }

  return {
    pc,
    createOffer,
  };
}
