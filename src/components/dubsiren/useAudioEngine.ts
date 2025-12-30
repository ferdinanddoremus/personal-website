'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

interface AudioEngineState {
  isPlaying: boolean;
  frequency: number;
  filterCutoff: number;
  resonance: number;
  waveform: OscillatorType;
  volume: number;
  lfoEnabled: boolean;
  lfoRate: number;
  lfoDepth: number;
}

export const useAudioEngine = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const lfoOscillatorRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);

  const [state, setState] = useState<AudioEngineState>({
    isPlaying: false,
    frequency: 440,
    filterCutoff: 2000,
    resonance: 1,
    waveform: 'sine',
    volume: 0.5,
    lfoEnabled: false,
    lfoRate: 2,
    lfoDepth: 500,
  });

  const initAudio = useCallback(() => {
    if (audioContextRef.current) return;

    const ctx = new AudioContext();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const analyser = ctx.createAnalyser();

    filter.type = 'lowpass';
    filter.frequency.value = state.filterCutoff;
    filter.Q.value = state.resonance;

    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;

    gain.gain.value = state.volume;

    // Create LFO oscillator and gain
    const lfoOscillator = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    lfoOscillator.frequency.value = state.lfoRate;
    lfoGain.gain.value = state.lfoEnabled ? state.lfoDepth : 0;

    // Connect LFO: lfoOscillator -> lfoGain -> filter.frequency
    lfoOscillator.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfoOscillator.start();

    // Connect: filter -> gain -> analyser -> destination
    filter.connect(gain);
    gain.connect(analyser);
    analyser.connect(ctx.destination);

    audioContextRef.current = ctx;
    filterRef.current = filter;
    gainRef.current = gain;
    analyserRef.current = analyser;
    lfoOscillatorRef.current = lfoOscillator;
    lfoGainRef.current = lfoGain;
  }, [state.filterCutoff, state.resonance, state.volume, state.lfoRate, state.lfoDepth, state.lfoEnabled]);

  const createOscillator = useCallback(() => {
    if (!audioContextRef.current || !filterRef.current) return null;

    const oscillator = audioContextRef.current.createOscillator();
    oscillator.type = state.waveform;
    oscillator.frequency.value = state.frequency;
    oscillator.connect(filterRef.current);

    return oscillator;
  }, [state.waveform, state.frequency]);

  const togglePlay = useCallback(() => {
    if (!state.isPlaying) {
      initAudio();

      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const oscillator = createOscillator();
      if (oscillator) {
        oscillator.start();
        oscillatorRef.current = oscillator;
        setState(prev => ({ ...prev, isPlaying: true }));
      }
    } else {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, [state.isPlaying, initAudio, createOscillator]);

  const setFrequency = useCallback((freq: number) => {
    setState(prev => ({ ...prev, frequency: freq }));
    if (oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(
        freq,
        audioContextRef.current.currentTime
      );
    }
  }, []);

  const setFilterCutoff = useCallback((cutoff: number) => {
    setState(prev => ({ ...prev, filterCutoff: cutoff }));
    if (filterRef.current && audioContextRef.current) {
      filterRef.current.frequency.setValueAtTime(
        cutoff,
        audioContextRef.current.currentTime
      );
    }
  }, []);

  const setResonance = useCallback((q: number) => {
    setState(prev => ({ ...prev, resonance: q }));
    if (filterRef.current && audioContextRef.current) {
      filterRef.current.Q.setValueAtTime(
        q,
        audioContextRef.current.currentTime
      );
    }
  }, []);

  const setWaveform = useCallback((wave: OscillatorType) => {
    setState(prev => ({ ...prev, waveform: wave }));
    if (oscillatorRef.current) {
      oscillatorRef.current.type = wave;
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    setState(prev => ({ ...prev, volume: vol }));
    if (gainRef.current && audioContextRef.current) {
      gainRef.current.gain.setValueAtTime(
        vol,
        audioContextRef.current.currentTime
      );
    }
  }, []);

  const sweepFrequency = useCallback((startFreq: number, endFreq: number, duration: number) => {
    if (oscillatorRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      const param = oscillatorRef.current.frequency;
      param.cancelScheduledValues(now);
      param.setValueAtTime(startFreq, now);
      param.exponentialRampToValueAtTime(endFreq, now + duration);

      setTimeout(() => {
        setState(prev => ({ ...prev, frequency: endFreq }));
      }, duration * 1000);
    }
  }, []);

  const sweepFilter = useCallback((startCutoff: number, endCutoff: number, duration: number) => {
    if (filterRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      const param = filterRef.current.frequency;
      param.cancelScheduledValues(now);
      param.setValueAtTime(startCutoff, now);
      param.exponentialRampToValueAtTime(endCutoff, now + duration);

      setTimeout(() => {
        setState(prev => ({ ...prev, filterCutoff: endCutoff }));
      }, duration * 1000);
    }
  }, []);

  const toggleLfo = useCallback(() => {
    setState(prev => ({ ...prev, lfoEnabled: !prev.lfoEnabled }));
    if (lfoGainRef.current && audioContextRef.current) {
      const newDepth = !state.lfoEnabled ? state.lfoDepth : 0;
      lfoGainRef.current.gain.setValueAtTime(
        newDepth,
        audioContextRef.current.currentTime
      );
    }
  }, [state.lfoEnabled, state.lfoDepth]);

  const setLfoRate = useCallback((rate: number) => {
    setState(prev => ({ ...prev, lfoRate: rate }));
    if (lfoOscillatorRef.current && audioContextRef.current) {
      lfoOscillatorRef.current.frequency.setValueAtTime(
        rate,
        audioContextRef.current.currentTime
      );
    }
  }, []);

  const setLfoDepth = useCallback((depth: number) => {
    setState(prev => ({ ...prev, lfoDepth: depth }));
    if (lfoGainRef.current && audioContextRef.current && state.lfoEnabled) {
      lfoGainRef.current.gain.setValueAtTime(
        depth,
        audioContextRef.current.currentTime
      );
    }
  }, [state.lfoEnabled]);

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {
          // Oscillator might already be stopped
        }
      }
      if (lfoOscillatorRef.current) {
        try {
          lfoOscillatorRef.current.stop();
          lfoOscillatorRef.current.disconnect();
        } catch (e) {
          // LFO might already be stopped
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    state,
    analyserNode: analyserRef.current,
    togglePlay,
    setFrequency,
    setFilterCutoff,
    setResonance,
    setWaveform,
    setVolume,
    sweepFrequency,
    sweepFilter,
    toggleLfo,
    setLfoRate,
    setLfoDepth,
  };
};
