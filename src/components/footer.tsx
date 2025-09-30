export const Footer = () => {
  return (
    <footer className="mono-container border-t py-2ch mt-4ch">
      <div className="text-center">
        <div>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="py-ch">
          built with{' '}
          <a
            href="https://waku.gg/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:no-underline"
          >
            waku.gg
          </a>
          {' | '}
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="underline hover:no-underline"
          >
            source
          </a>
        </div>
      </div>
    </footer>
  );
};
