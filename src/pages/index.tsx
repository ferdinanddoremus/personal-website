import { Link } from 'waku';

export default async function HomePage() {
  return (
    <div>
      <title>Groremus</title>
      <h2 className="font-bold mb-2ch uppercase">
        Ferdinand Dorémus
      </h2>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
