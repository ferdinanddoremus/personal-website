import { Link } from 'waku';

export default async function AboutPage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
      <p>
        Some cool stuff i work on:
      </p>
      <ul className="gap-x-ch">
        <li>
          <a href="https://siwa.io" target="_blank" rel="noreferrer" className="underline hover:no-underline">
            siwa.io
          </a>
        </li>
        <li>
          <Link to="/dubsiren" className="underline hover:no-underline">
            dubsiren
          </Link>
        </li>
      </ul>
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'About',
    headline: 'About Waku',
    body: 'The minimal React framework',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
