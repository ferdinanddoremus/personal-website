'use client';

import { useAudioEngine } from './useAudioEngine';
import { ParameterControls } from './ParameterControls';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpectrumVisualizer } from './SpectrumVisualizer';

export const DubSirenEngine = () => {
  const {
    state,
    analyserNode,
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
  } = useAudioEngine();

  const handleSweepFrequency = () => {
    sweepFrequency(state.frequency, state.frequency * 0.5, 2.0);
  };

  const handleSweepFilter = () => {
    sweepFilter(state.filterCutoff, state.filterCutoff * 0.3, 1.5);
  };

  return (
    <div className="max-w-80ch">
      <WaveformVisualizer analyserNode={analyserNode} isPlaying={state.isPlaying} />

      <SpectrumVisualizer analyserNode={analyserNode} isPlaying={state.isPlaying} />

      <ParameterControls
        frequency={state.frequency}
        filterCutoff={state.filterCutoff}
        resonance={state.resonance}
        waveform={state.waveform}
        volume={state.volume}
        isPlaying={state.isPlaying}
        lfoEnabled={state.lfoEnabled}
        lfoRate={state.lfoRate}
        lfoDepth={state.lfoDepth}
        onFrequencyChange={setFrequency}
        onFilterCutoffChange={setFilterCutoff}
        onResonanceChange={setResonance}
        onWaveformChange={setWaveform}
        onVolumeChange={setVolume}
        onTogglePlay={togglePlay}
        onSweepFrequency={handleSweepFrequency}
        onSweepFilter={handleSweepFilter}
        onToggleLfo={toggleLfo}
        onLfoRateChange={setLfoRate}
        onLfoDepthChange={setLfoDepth}
      />

      <div className="border-[2px] p-2ch text-sm">
        <div className="font-bold mb-[calc(var(--line-height)/2)]">USAGE</div>
        <ul className="list-disc pl-4ch space-y-[calc(var(--line-height)/2)]">
          <li>Press PLAY to start the oscillator</li>
          <li>Adjust frequency (40-2000 Hz) for pitch control</li>
          <li>Use filter cutoff to shape the sound brightness</li>
          <li>Increase resonance for characteristic dub siren "wah"</li>
          <li>Enable LFO WOBBLE for automatic filter modulation (rate: speed, depth: intensity)</li>
          <li>Press sweep buttons during playback for automated effects</li>
        </ul>
      </div>
    </div>
  );
};
