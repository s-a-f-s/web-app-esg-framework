import type { Framework } from '@shared/schema';

// Framework categories for filtering
export const FRAMEWORK_CATEGORIES = [
  'Universal',
  'EU Mandatory', 
  'Industry-Specific',
  'Nature-Focused',
  'Principles-Based',
  'Value Creation'
] as const;

// Focus areas across all frameworks
export const FOCUS_AREAS = [
  'Environmental',
  'Social', 
  'Economic',
  'Governance',
  'Climate',
  'Pollution',
  'Water',
  'Biodiversity',
  'Circular Economy',
  'Workforce',
  'Communities',
  'Consumers',
  'Business Conduct',
  'Human Rights',
  'Labour',
  'Anti-Corruption',
  'Nature Dependencies',
  'Nature Impacts', 
  'Nature Risks',
  'Nature Opportunities',
  'Financial Capital',
  'Manufactured Capital',
  'Intellectual Capital',
  'Human Capital',
  'Social Capital',
  'Natural Capital'
] as const;

// Key features mapping for frameworks
export const FRAMEWORK_FEATURES = {
  gri: [
    'Modular structure',
    'Universal standards', 
    'Topic-specific standards',
    'Sector-specific guidance',
    'Stakeholder inclusiveness',
    'Materiality assessment',
    'Completeness principle',
    'Comparability focus'
  ],
  esrs: [
    'Double materiality',
    'Mandatory assurance', 
    'Digital taxonomy',
    'Value chain reporting',
    'EU taxonomy alignment',
    'Climate disclosure',
    'Biodiversity reporting',
    'Social metrics'
  ],
  sasb: [
    'Industry-specific metrics',
    'Financial materiality',
    'Investor-focused',
    'SEC-compatible',
    '77 industry standards',
    'Quantitative metrics',
    'Activity metrics',
    'Forward-looking guidance'
  ],
  tnfd: [
    'LEAP assessment',
    'Nature-related risks',
    'Scenario analysis', 
    'Location-specific data',
    'Dependencies mapping',
    'Impact assessment',
    'Risk evaluation',
    'Opportunity identification'
  ],
  ungc: [
    'Ten Principles',
    'SDG alignment',
    'Networks',
    'Learning opportunities',
    'Peer learning',
    'Collective action',
    'Local networks',
    'Annual reporting'
  ],
  ir: [
    'Six capitals',
    'Value creation',
    'Integrated thinking',
    'Concise reporting',
    'Strategic focus',
    'Connectivity',
    'Future orientation',
    'Stakeholder relationships'
  ]
} as const;

// Framework difficulty levels
export const FRAMEWORK_DIFFICULTY = {
  gri: 'Medium',
  esrs: 'High', 
  sasb: 'Medium-High',
  tnfd: 'High',
  ungc: 'Low-Medium',
  ir: 'Medium'
} as const;

// Implementation timeframes (in months)
export const IMPLEMENTATION_TIME = {
  gri: '6-12',
  esrs: '12-18',
  sasb: '4-8', 
  tnfd: '8-15',
  ungc: '3-6',
  ir: '6-10'
} as const;

// Cost estimates for implementation
export const IMPLEMENTATION_COST = {
  gri: 'Medium',
  esrs: 'High',
  sasb: 'Medium',
  tnfd: 'High', 
  ungc: 'Low',
  ir: 'Medium'
} as const;

// Framework relationships and overlaps
export const FRAMEWORK_RELATIONSHIPS = {
  gri: {
    complements: ['esrs', 'ungc', 'ir'],
    overlaps: ['esrs'],
    alternatives: ['sasb']
  },
  esrs: {
    complements: ['gri', 'tnfd'],
    overlaps: ['gri', 'sasb'],
    alternatives: []
  },
  sasb: {
    complements: ['gri', 'tnfd'],
    overlaps: ['esrs'],
    alternatives: ['gri']
  },
  tnfd: {
    complements: ['gri', 'esrs', 'sasb'],
    overlaps: [],
    alternatives: []
  },
  ungc: {
    complements: ['gri', 'ir'],
    overlaps: [],
    alternatives: []
  },
  ir: {
    complements: ['gri', 'ungc', 'sasb'],
    overlaps: [],
    alternatives: []
  }
} as const;

// Utility functions for framework data
export const getFrameworkByCategory = (category: string, frameworks: Framework[]): Framework[] => {
  return frameworks.filter(f => f.category === category);
};

export const getMandatoryFrameworks = (frameworks: Framework[]): Framework[] => {
  return frameworks.filter(f => f.isMandatory);
};

export const getVoluntaryFrameworks = (frameworks: Framework[]): Framework[] => {
  return frameworks.filter(f => !f.isMandatory);
};

export const getFrameworksByFocusArea = (focusArea: string, frameworks: Framework[]): Framework[] => {
  return frameworks.filter(f => f.focusAreas.includes(focusArea));
};

export const getFrameworksByYear = (year: number, frameworks: Framework[]): Framework[] => {
  return frameworks.filter(f => f.establishedYear === year);
};

export const getFrameworkComplements = (frameworkId: string): string[] => {
  return FRAMEWORK_RELATIONSHIPS[frameworkId as keyof typeof FRAMEWORK_RELATIONSHIPS]?.complements || [];
};

export const getFrameworkOverlaps = (frameworkId: string): string[] => {
  return FRAMEWORK_RELATIONSHIPS[frameworkId as keyof typeof FRAMEWORK_RELATIONSHIPS]?.overlaps || [];
};

export const getFrameworkAlternatives = (frameworkId: string): string[] => {
  return FRAMEWORK_RELATIONSHIPS[frameworkId as keyof typeof FRAMEWORK_RELATIONSHIPS]?.alternatives || [];
};

export const getImplementationDifficulty = (frameworkId: string): string => {
  return FRAMEWORK_DIFFICULTY[frameworkId as keyof typeof FRAMEWORK_DIFFICULTY] || 'Unknown';
};

export const getImplementationTime = (frameworkId: string): string => {
  return IMPLEMENTATION_TIME[frameworkId as keyof typeof IMPLEMENTATION_TIME] || 'Unknown';
};

export const getImplementationCost = (frameworkId: string): string => {
  return IMPLEMENTATION_COST[frameworkId as keyof typeof IMPLEMENTATION_COST] || 'Unknown';
};

// Framework statistics
export const getFrameworkStats = (frameworks: Framework[]) => {
  return {
    total: frameworks.length,
    mandatory: frameworks.filter(f => f.isMandatory).length,
    voluntary: frameworks.filter(f => !f.isMandatory).length,
    withIndustrySpecificity: frameworks.filter(f => f.hasIndustrySpecificity).length,
    categories: [...new Set(frameworks.map(f => f.category))].length,
    averageYear: Math.round(
      frameworks.reduce((sum, f) => sum + (f.establishedYear || 0), 0) / frameworks.length
    )
  };
};
