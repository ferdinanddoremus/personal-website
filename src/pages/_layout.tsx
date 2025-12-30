import '../styles.css';

import type { ReactNode } from 'react';

import { Header } from '../components/header';
import { Debug } from '../components/debug';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="font-mono min-h-screen">
      <link rel="icon" type="image/png" href={data.icon} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const stored = localStorage.getItem('theme');
                const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const theme = stored || systemPreference;
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })();
          `,
        }}
      />
      <script data-goatcounter="https://groremus.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
      <main className="container relative">
        <Header />
        {children}
        <Debug />
      </main>
    </div>
  );
}

const getData = async () => {
  const data = {
    description: 'Ferdinand Dorémus - Senior React Native Developer, cyclist, and specialty coffee lover. Writing about code, bikes, and coffee.',
    icon: '/favicon.ico',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
