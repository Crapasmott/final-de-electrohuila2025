// src/lib/algolia.js
import algoliasearch from 'algoliasearch/lite';

// Cliente para búsquedas (frontend)
export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

// Cliente para administración (backend/indexación)
export const adminClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

export const ALGOLIA_INDEX_NAME = 'electrohuila_content';