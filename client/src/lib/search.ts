
import type { Framework, Resource } from '@shared/schema';
import type { IFuseOptions } from 'fuse.js';

// Configuration for framework search
const frameworkSearchOptions: IFuseOptions<Framework> = {
  keys: [
    { name: 'name', weight: 0.3 },
    { name: 'fullName', weight: 0.2 },
    { name: 'description', weight: 0.2 },
    { name: 'focusAreas', weight: 0.1 },
    { name: 'keyFeatures', weight: 0.1 },
    { name: 'category', weight: 0.1 }
  ],
    threshold: 0.4, // Lower threshold for more precise matches
    includeScore: true,
    minMatchCharLength: 2
  };
