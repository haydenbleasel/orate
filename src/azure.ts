import Azure from "microsoft-cognitiveservices-speech-sdk";

const createProvider = () => {
  const apiKey = process.env.AZURE_API_KEY;
  const region = process.env.AZURE_REGION;

  if (!apiKey) {
    throw new Error("AZURE_API_KEY is not set");
  }

  if (!region) {
    throw new Error("AZURE_REGION is not set");
  }

  const speechConfig = Azure.SpeechConfig.fromSubscription(apiKey, region);
  speechConfig.speechRecognitionLanguage = "en-US";

  return speechConfig;
};

export const azure = {
  tts: () => {},
  sst: () => {
    const provider = createProvider();

    return async (audio: ArrayBuffer) => {
      const file = new File([audio], "audio.wav", { type: "audio/wav" });
      const audioConfig = Azure.AudioConfig.fromWavFileInput(file);
      const speechRecognizer = new Azure.SpeechRecognizer(provider, audioConfig);

      speechRecognizer.recognizeOnceAsync((result) => {
        switch (result.reason) {
          case Azure.ResultReason.RecognizedSpeech:
            return result.text;
          case Azure.ResultReason.NoMatch:
            return null;
          case Azure.ResultReason.Canceled:
            throw Azure.CancellationDetails.fromResult(result).reason;
          default:
            break;
        }
        
        speechRecognizer.close();
      });
    };
  },
};

