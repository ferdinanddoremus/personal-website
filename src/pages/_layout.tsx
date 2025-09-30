import '../styles.css';

import type { ReactNode } from 'react';

import { Header } from '../components/header';
// import { Footer } from '../components/footer';
import { Debug } from '../components/debug';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="font-mono min-h-screen">
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <main className="container relative">
        <Header />
        {children}
        <Debug />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

const getData = async () => {
  const data = {
    description: 'An internet website!',
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
