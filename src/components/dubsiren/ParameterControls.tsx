'use client';

interface ParameterControlsProps {
  frequency: number;
  filterCutoff: number;
  resonance: number;
  waveform: OscillatorType;
  volume: number;
  isPlaying: boolean;
  lfoEnabled: boolean;
  lfoRate: number;
  lfoDepth: number;
  onFrequencyChange: (val: number) => void;
  onFilterCutoffChange: (val: number) => void;
  onResonanceChange: (val: number) => void;
  onWaveformChange: (val: OscillatorType) => void;
  onVolumeChange: (val: number) => void;
  onTogglePlay: () => void;
  onSweepFrequency: () => void;
  onSweepFilter: () => void;
  onToggleLfo: () => void;
  onLfoRateChange: (val: number) => void;
  onLfoDepthChange: (val: number) => void;
}

export const ParameterControls = ({
  frequency,
  filterCutoff,
  resonance,
  waveform,
  volume,
  isPlaying,
  lfoEnabled,
  lfoRate,
  lfoDepth,
  onFrequencyChange,
  onFilterCutoffChange,
  onResonanceChange,
  onWaveformChange,
  onVolumeChange,
  onTogglePlay,
  onSweepFrequency,
  onSweepFilter,
  onToggleLfo,
  onLfoRateChange,
  onLfoDepthChange,
}: ParameterControlsProps) => {
  return (
    <div className="border-[2px] p-2ch mb-2lh">
      <div className="mb-lh">
        <button
          onClick={onTogglePlay}
          className="w-full border-[2px] px-2ch py-[calc(var(--line-height)/2-1px)] hover:bg-[color-mix(in_srgb,var(--text-color)_10%,var(--background-color)_90%)] transition-colors"
        >
          {isPlaying ? '■ STOP' : '▶ PLAY'}
        </button>
      </div>

      <div className="mb-lh">
        <label className="block font-bold mb-[calc(var(--line-height)/2)]">
          WAVEFORM
        </label>
        <div className="grid grid-cols-4 gap-ch">
          {(['sine', 'square', 'sawtooth', 'triangle'] as OscillatorType[]).map((wave) => (
            <button
              key={wave}
              onClick={() => onWaveformChange(wave)}
              className={`border-[2px] px-ch py-[calc(var(--line-height)/2-1px)] transition-colors ${
                waveform === wave
                  ? 'bg-[var(--text-color)] text-[var(--background-color)]'
                  : 'hover:bg-[color-mix(in_srgb,var(--text-color)_10%,var(--background-color)_90%)]'
              }`}
            >
              {wave.slice(0, 3).toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-lh">
        <label className="flex justify-between font-bold mb-[calc(var(--line-height)/2)]">
          <span>FREQUENCY</span>
          <span>{frequency.toFixed(0)} Hz</span>
        </label>
        <input
          type="range"
          min="40"
          max="2000"
          step="1"
          value={frequency}
          onChange={(e) => onFrequencyChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-lh">
        <label className="flex justify-between font-bold mb-[calc(var(--line-height)/2)]">
          <span>FILTER CUTOFF</span>
          <span>{filterCutoff.toFixed(0)} Hz</span>
        </label>
        <input
          type="range"
          min="100"
          max="10000"
          step="10"
          value={filterCutoff}
          onChange={(e) => onFilterCutoffChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-lh">
        <label className="flex justify-between font-bold mb-[calc(var(--line-height)/2)]">
          <span>RESONANCE</span>
          <span>{resonance.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="0.1"
          max="20"
          step="0.1"
          value={resonance}
          onChange={(e) => onResonanceChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-lh">
        <label className="flex justify-between font-bold mb-[calc(var(--line-height)/2)]">
          <span>VOLUME</span>
          <span>{(volume * 100).toFixed(0)}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-lh border-t-[2px] pt-lh">
        <div className="flex items-center justify-between mb-lh">
          <span className="font-bold">LFO WOBBLE</span>
          <button
            onClick={onToggleLfo}
            className={`border-[2px] px-2ch py-[calc(var(--line-height)/2-1px)] transition-colors ${
              lfoEnabled
                ? 'bg-[var(--text-color)] text-[var(--background-color)]'
                : 'hover:bg-[color-mix(in_srgb,var(--text-color)_10%,var(--background-color)_90%)]'
            }`}
          >
            {lfoEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="mb-lh">
          <label className="flex justify-between font-bold mb-[calc(var(--line-height)/2)]">
            <span>LFO RATE</span>
            <span>{lfoRate.toFixed(1)} Hz</span>
          </label>
          <input
            type="range"
            min="0.1"
            max="20"
            step="0.1"
            value={lfoRate}
            onChange={(e) => onLfoRateChange(Number(e.target.value))}
            className="w-full"
            disabled={!lfoEnabled}
          />
        </div>

        <div className="mb-lh">
          <label className="flex justify-between font-bold mb-[calc(var(--line-height)/2)]">
            <span>LFO DEPTH</span>
            <span>{lfoDepth.toFixed(0)} Hz</span>
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={lfoDepth}
            onChange={(e) => onLfoDepthChange(Number(e.target.value))}
            className="w-full"
            disabled={!lfoEnabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-ch">
        <button
          onClick={onSweepFrequency}
          disabled={!isPlaying}
          className="border-[2px] px-ch py-[calc(var(--line-height)/2-1px)] hover:bg-[color-mix(in_srgb,var(--text-color)_10%,var(--background-color)_90%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          SWEEP FREQ
        </button>
        <button
          onClick={onSweepFilter}
          disabled={!isPlaying}
          className="border-[2px] px-ch py-[calc(var(--line-height)/2-1px)] hover:bg-[color-mix(in_srgb,var(--text-color)_10%,var(--background-color)_90%)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          SWEEP FILTER
        </button>
      </div>
    </div>
  );
};
