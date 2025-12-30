'use client';

import { useEffect, useRef } from 'react';

interface SpectrumVisualizerProps {
  analyserNode: AnalyserNode | null;
  isPlaying: boolean;
}

export const SpectrumVisualizer = ({ analyserNode, isPlaying }: SpectrumVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!analyserNode || !canvasRef.current || !isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Clear canvas when stopped
      if (canvasRef.current && !isPlaying) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const computedStyle = getComputedStyle(canvas);
          const bgColor = computedStyle.backgroundColor || '#000000';
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Get computed colors from the DOM
    const computedStyle = getComputedStyle(canvas);
    const bgColor = computedStyle.backgroundColor || '#000000';
    const textColor = computedStyle.color || '#ffffff';

    // Parse RGB values for color mixing
    const parseRgb = (color: string): [number, number, number] => {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        return [parseInt(match[1]!), parseInt(match[2]!), parseInt(match[3]!)];
      }
      return [255, 255, 255];
    };

    const [bgR, bgG, bgB] = parseRgb(bgColor);
    const [textR, textG, textB] = parseRgb(textColor);

    const mixColors = (ratio: number): string => {
      const r = Math.round(bgR + (textR - bgR) * ratio);
      const g = Math.round(bgG + (textG - bgG) * ratio);
      const b = Math.round(bgB + (textB - bgB) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    };

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);

      analyserNode.getByteFrequencyData(dataArray);

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i]! / 255) * canvas.height;

        const brightness = i / bufferLength;
        ctx.fillStyle = mixColors(brightness);

        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyserNode, isPlaying]);

  return (
    <div className="border-[2px] p-2ch mb-2lh">
      <div className="font-bold mb-[calc(var(--line-height)/2)]">SPECTRUM</div>
      <canvas
        ref={canvasRef}
        width={600}
        height={120}
        className="w-full bg-[var(--background-color)]"
        style={{ imageRendering: 'crisp-edges' }}
      />
    </div>
  );
};
