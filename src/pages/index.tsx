import { Link } from 'waku';
import { SEO } from '../components/seo';
import { WebsiteStructuredData } from '../components/structured-data';

export default async function HomePage() {
  return (
    <div>
      <SEO url="/" />
      <WebsiteStructuredData />
      <h2 className="font-bold mb-2ch">
        Ferdinand Dorémus
      </h2>

      <p className="mb-2lh">
        Senior frontend engineer with 11+ years crafting impactful products. I'm passionate about building mobile apps that truly make a difference. Love shipping fast. Like to hack on stuff.
      </p>

      <div className="mb-2lh">
        <h3 className="font-bold mb-lh">Previously</h3>
        <p>
          <a href="https://ulysse.com" target="_blank" rel="noreferrer" className="underline hover:no-underline">Ulysse</a>, <a href="https://sush.app" target="_blank" rel="noreferrer" className="underline hover:no-underline">Sush</a>, <a href="https://fabernovel.com" target="_blank" rel="noreferrer" className="underline hover:no-underline">Fabernovel</a>, <a href="https://www.garance.com/cagnup-epargne-par-cagnottage" target="_blank" rel="noreferrer" className="underline hover:no-underline">Cagnup</a>.
        </p>
      </div>

      <div className="mb-2lh">
        <h3 className="font-bold mb-lh">Currently</h3>
        <p className="mb-lh">
          Senior Mobile Engineer at <a href="https://www.letemps.ch" target="_blank" rel="noreferrer" className="underline hover:no-underline">Le Temps</a>, Geneva, Switzerland. Leading mobile strategy and driving React Native transformation.
        </p>
        <p className="mb-lh">
          Most of the time i ride bikes, learn japanese, experiment with linux, cook food or brew coffee.
        </p>
      </div>

      <div>
        <a href="mailto:ferdinand@grorem.us" className="underline hover:no-underline">
          ferdinand@grorem.us
        </a>
        {' · '}
        <a href="tel:+33768624042" className="underline hover:no-underline">+33768624042</a>
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
