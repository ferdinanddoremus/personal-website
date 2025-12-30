// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_Dubsiren_getConfig } from './pages/dubsiren';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';
// prettier-ignore
import type { getConfig as File_Projects_getConfig } from './pages/projects';
// prettier-ignore
import type { getConfig as File_WritingsSlug_getConfig } from './pages/writings/[slug]';

// prettier-ignore
type Page =
| ({ path: '/dubsiren' } & GetConfigResponse<typeof File_Dubsiren_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>)
| ({ path: '/projects' } & GetConfigResponse<typeof File_Projects_getConfig>)
| ({ path: '/writings/[slug]' } & GetConfigResponse<typeof File_WritingsSlug_getConfig>)
| { path: '/writings'; render: 'dynamic' };

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
