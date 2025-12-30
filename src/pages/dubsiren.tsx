import { DubSirenEngine } from '../components/dubsiren/DubSirenEngine';

export default async function DubSirenPage() {
  return (
    <div>
      <title>Dub Siren - Groremus</title>
      <div className="mb-2lh">
        <h2 className="font-bold mb-lh">Dub Siren Generator</h2>
        <p className="mb-lh">
          A browser-based dub siren sound generator using the Web Audio API.
          Control pitch sweeps, filter cutoff, resonance, and waveform types.
        </p>
      </div>

      <DubSirenEngine />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
