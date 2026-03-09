import { useEffect, useState } from "react";

/**
 * Hook to monitor audio level from a MediaStream
 * Returns a value between 0-1 representing the current audio input level
 *
 * Uses Web Audio API with FFT analysis for real-time audio visualization
 */
export function useAudioLevel(stream: MediaStream | null): number {
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (!stream) {
      setAudioLevel(0);
      return;
    }

    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let animationFrameId: number | null = null;

    try {
      // Create audio context and analyser
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      // Connect the stream to the analyser
      source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      // Function to continuously check audio level
      const checkAudioLevel = () => {
        if (!analyser) return;

        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume
        const sum = dataArray.reduce((acc, val) => acc + val, 0);
        const average = sum / dataArray.length;

        // Normalize to 0-1 range (byte values are 0-255)
        const normalized = average / 255;

        setAudioLevel(normalized);

        animationFrameId = requestAnimationFrame(checkAudioLevel);
      };

      checkAudioLevel();
    } catch (error) {
      console.error("Error setting up audio level monitoring:", error);
      setAudioLevel(0);
    }

    // Cleanup
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (source) {
        source.disconnect();
      }
      if (audioContext) {
        void audioContext.close();
      }
    };
  }, [stream]);

  return audioLevel;
}
