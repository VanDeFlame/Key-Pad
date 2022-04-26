let action = {
  audio: new Audio('')
};

const playAudio = (url, volume) => {
  action.audio.src = url;
  action.audio.volume = volume/10;
  action.audio.play();
}

const useActions = (payload) => {
  switch (payload.type)
  {
    case 'audio':
      playAudio(payload.url, payload.volume);
      break;
    case 'stop':
      action.audio.pause();
      break;
    default:
      break;
  }
}

export default useActions;