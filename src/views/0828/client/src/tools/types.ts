export interface ScreenShareAnswerOfferMsg {
  clientId: number;
  type: "answer" | "offer";
  data: RTCSessionDescriptionInit;
}

export interface ScreenShareIcecandidateMsg {
  clientId: number;
  type: "ice";
  data: RTCIceCandidate;
}

export interface VideoChatAnswerOfferMsg {
  clientId: number;
  type: "answer" | "offer";
  data: RTCSessionDescriptionInit;
}
export interface VideoChatIcecandidateMsg {
  clientId: number;
  type: "ice";
  data: RTCIceCandidate;
}
