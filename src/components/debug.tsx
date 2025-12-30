'use client';

import { useState } from 'react';

export const Debug = () => {
  const [debug, setDebug] = useState(false);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div>
      <div className="flex items-center gap-ch absolute top-0 right-0">
        <input type="checkbox" checked={debug} onChange={() => setDebug(!debug)} />
        <label htmlFor="debug">Debug</label>
      </div>
      {debug && <div className="debug-grid" />}
    </div>
  );
};