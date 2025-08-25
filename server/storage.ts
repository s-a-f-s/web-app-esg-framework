import { type Framework, type Resource, type SelectorQuestion, type FrameworkComparison, type InsertFramework, type InsertResource, type InsertSelectorQuestion, type InsertFrameworkComparison } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Frameworks
  getFrameworks(): Promise<Framework[]>;
  getFramework(id: string): Promise<Framework | undefined>;
  createFramework(framework: InsertFramework): Promise<Framework>;
  
  // Resources
  getResources(): Promise<Resource[]>;
  getResourcesByType(type: string): Promise<Resource[]>;
  getResourcesByFramework(frameworkId: string): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Selector Questions
  getSelectorQuestions(): Promise<SelectorQuestion[]>;
  createSelectorQuestion(question: InsertSelectorQuestion): Promise<SelectorQuestion>;
  
  // Framework Comparisons
  getFrameworkComparisons(): Promise<FrameworkComparison[]>;
  createFrameworkComparison(comparison: InsertFrameworkComparison): Promise<FrameworkComparison>;
  
  // Search
  searchContent(query: string): Promise<{frameworks: Framework[], resources: Resource[]}>;
}

export class MemStorage implements IStorage {
  private frameworks: Map<string, Framework>;
  private resources: Map<string, Resource>;
  private selectorQuestions: Map<string, SelectorQuestion>;
  private frameworkComparisons: Map<string, FrameworkComparison>;

  constructor() {
    this.frameworks = new Map();
    this.resources = new Map();
    this.selectorQuestions = new Map();
    this.frameworkComparisons = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize frameworks
    const frameworksData: Framework[] = [
      {
        id: "gri",
        name: "GRI Standards",
        fullName: "Global Reporting Initiative",
        description: "The world's most widely adopted sustainability reporting standards, providing a comprehensive framework for impact disclosure.",
        category: "Universal",
        isMandatory: false,
        hasIndustrySpecificity: true,
        focusAreas: ["Environmental", "Social", "Economic", "Governance"],
        establishedYear: 1997,
        keyFeatures: ["Modular structure", "Universal standards", "Topic-specific standards", "Sector-specific guidance"],
        targetAudience: "All organizations seeking comprehensive sustainability reporting",
        website: "https://www.globalreporting.org",
        backgroundColor: "from-blue-500 to-blue-600",
        iconColor: "text-blue-600"
      },
      {
        id: "esrs",
        name: "ESRS",
        fullName: "European Sustainability Reporting Standards",
        description: "EU's mandatory sustainability reporting requirements under the Corporate Sustainability Reporting Directive (CSRD).",
        category: "EU Mandatory",
        isMandatory: true,
        hasIndustrySpecificity: true,
        focusAreas: ["Climate", "Pollution", "Water", "Biodiversity", "Circular Economy", "Workforce", "Communities", "Consumers", "Business Conduct"],
        establishedYear: 2023,
        keyFeatures: ["Double materiality", "Mandatory assurance", "Digital taxonomy", "Value chain reporting"],
        targetAudience: "EU companies subject to CSRD",
        website: "https://www.efrag.org",
        backgroundColor: "from-green-500 to-green-600",
        iconColor: "text-green-600"
      },
      {
        id: "sasb",
        name: "SASB Standards",
        fullName: "Sustainability Accounting Standards Board",
        description: "Industry-specific standards focused on financially material sustainability topics for investors.",
        category: "Industry-Specific",
        isMandatory: false,
        hasIndustrySpecificity: true,
        focusAreas: ["Environment", "Social Capital", "Human Capital", "Business Model & Innovation", "Leadership & Governance"],
        establishedYear: 2011,
        keyFeatures: ["Industry-specific metrics", "Financial materiality", "Investor-focused", "SEC-compatible"],
        targetAudience: "Public companies and investors",
        website: "https://www.sasb.org",
        backgroundColor: "from-teal-500 to-teal-600",
        iconColor: "text-teal-600"
      },
      {
        id: "tnfd",
        name: "TNFD",
        fullName: "Taskforce on Nature-related Financial Disclosures",
        description: "Framework for organizations to report and act on evolving nature-related risks and opportunities.",
        category: "Nature-Focused",
        isMandatory: false,
        hasIndustrySpecificity: false,
        focusAreas: ["Nature Dependencies", "Nature Impacts", "Nature Risks", "Nature Opportunities"],
        establishedYear: 2021,
        keyFeatures: ["LEAP assessment", "Nature-related risks", "Scenario analysis", "Location-specific data"],
        targetAudience: "Organizations with significant nature dependencies",
        website: "https://tnfd.global",
        backgroundColor: "from-emerald-500 to-emerald-600",
        iconColor: "text-emerald-600"
      },
      {
        id: "ungc",
        name: "UN Global Compact",
        fullName: "United Nations Global Compact",
        description: "World's largest corporate sustainability initiative based on Ten Principles and SDG alignment.",
        category: "Principles-Based",
        isMandatory: false,
        hasIndustrySpecificity: false,
        focusAreas: ["Human Rights", "Labour", "Environment", "Anti-Corruption"],
        establishedYear: 2000,
        keyFeatures: ["Ten Principles", "SDG alignment", "Networks", "Learning opportunities"],
        targetAudience: "Companies committed to responsible business practices",
        website: "https://www.unglobalcompact.org",
        backgroundColor: "from-indigo-500 to-indigo-600",
        iconColor: "text-indigo-600"
      },
      {
        id: "ir",
        name: "Integrated Reporting",
        fullName: "Value Reporting Foundation",
        description: "Concise communication about how strategy, governance, and performance create value over time.",
        category: "Value Creation",
        isMandatory: false,
        hasIndustrySpecificity: false,
        focusAreas: ["Financial Capital", "Manufactured Capital", "Intellectual Capital", "Human Capital", "Social Capital", "Natural Capital"],
        establishedYear: 2010,
        keyFeatures: ["Six capitals", "Value creation", "Integrated thinking", "Concise reporting"],
        targetAudience: "Organizations seeking integrated value reporting",
        website: "https://www.valuereportingfoundation.org",
        backgroundColor: "from-purple-500 to-purple-600",
        iconColor: "text-purple-600"
      }
    ];

    frameworksData.forEach(framework => {
      this.frameworks.set(framework.id, framework);
    });

    // Initialize resources
    const resourcesData: Resource[] = [
      {
        id: "gri-quick-start",
        title: "GRI Standards Quick Start",
        description: "Comprehensive guide to getting started with GRI reporting",
        type: "guide",
        category: "Implementation",
        frameworkId: "gri",
        fileType: "pdf",
        pageCount: 24,
        duration: null,
        downloadUrl: "/resources/gri-quick-start.pdf",
        tags: ["beginner", "implementation", "standards"]
      },
      {
        id: "esrs-roadmap",
        title: "ESRS Implementation Roadmap",
        description: "Step-by-step roadmap for CSRD compliance",
        type: "guide",
        category: "Implementation",
        frameworkId: "esrs",
        fileType: "pdf",
        pageCount: 32,
        duration: null,
        downloadUrl: "/resources/esrs-roadmap.pdf",
        tags: ["implementation", "compliance", "roadmap"]
      },
      {
        id: "materiality-template",
        title: "Materiality Assessment Template",
        description: "Interactive Excel template for conducting materiality assessments",
        type: "template",
        category: "Assessment",
        frameworkId: null,
        fileType: "excel",
        pageCount: null,
        duration: null,
        downloadUrl: "/resources/materiality-template.xlsx",
        tags: ["materiality", "assessment", "template"]
      },
      {
        id: "sasb-industry-guide",
        title: "SASB Industry Standards Guide",
        description: "Comprehensive guide to industry-specific SASB standards and metrics",
        type: "guide",
        category: "Implementation",
        frameworkId: "sasb",
        fileType: "pdf",
        pageCount: 45,
        duration: null,
        downloadUrl: "/resources/sasb-industry-guide.pdf",
        tags: ["sasb", "industry", "standards", "metrics"]
      },
      {
        id: "tnfd-leap-template",
        title: "TNFD LEAP Assessment Template",
        description: "Template for conducting TNFD LEAP (Locate, Evaluate, Assess, Prepare) assessments",
        type: "template",
        category: "Assessment",
        frameworkId: "tnfd",
        fileType: "excel",
        pageCount: null,
        duration: null,
        downloadUrl: "/resources/tnfd-leap-template.xlsx",
        tags: ["tnfd", "leap", "assessment", "nature"]
      },
      {
        id: "esg-reporting-checklist",
        title: "ESG Reporting Checklist",
        description: "Comprehensive checklist for ESG reporting preparation and review",
        type: "template",
        category: "Reporting",
        frameworkId: null,
        fileType: "pdf",
        pageCount: 12,
        duration: null,
        downloadUrl: "/resources/esg-checklist.pdf",
        tags: ["checklist", "reporting", "preparation", "review"]
      }
    ];

    resourcesData.forEach(resource => {
      this.resources.set(resource.id, resource);
    });

    // Initialize selector questions
    const questionsData: SelectorQuestion[] = [
      {
        id: "q1",
        question: "What is your organization's primary reporting objective?",
        order: 1,
        options: [
          {
            value: "compliance",
            label: "Compliance with regulatory requirements",
            description: "Meet mandatory reporting obligations"
          },
          {
            value: "transparency",
            label: "Stakeholder transparency and communication",
            description: "Build trust with investors, customers, and communities"
          },
          {
            value: "performance",
            label: "Internal performance management",
            description: "Track and improve sustainability performance"
          },
          {
            value: "materiality",
            label: "Financial materiality and risk management",
            description: "Focus on financially material sustainability factors"
          }
        ]
      }
    ];

    questionsData.forEach(question => {
      this.selectorQuestions.set(question.id, question);
    });

    // Initialize comparison data
    const comparisonData: FrameworkComparison[] = [
      {
        id: "mandatory-status",
        feature: "Mandatory Status",
        description: "Whether the framework is required by regulation",
        values: {
          gri: "Voluntary",
          esrs: "Mandatory (EU)",
          sasb: "Voluntary",
          tnfd: "Voluntary",
          ungc: "Voluntary",
          ir: "Voluntary"
        },
        order: 1
      },
      {
        id: "industry-specificity",
        feature: "Industry Specificity",
        description: "Level of industry-specific guidance",
        values: {
          gri: "High",
          esrs: "High",
          sasb: "Very High",
          tnfd: "Medium",
          ungc: "Low",
          ir: "Medium"
        },
        order: 2
      },
      {
        id: "financial-materiality",
        feature: "Financial Materiality Focus",
        description: "Emphasis on financially material topics",
        values: {
          gri: "Medium",
          esrs: "High",
          sasb: "Very High",
          tnfd: "High",
          ungc: "Low",
          ir: "High"
        },
        order: 3
      }
    ];

    comparisonData.forEach(comparison => {
      this.frameworkComparisons.set(comparison.id, comparison);
    });
  }

  // Framework methods
  async getFrameworks(): Promise<Framework[]> {
    return Array.from(this.frameworks.values());
  }

  async getFramework(id: string): Promise<Framework | undefined> {
    return this.frameworks.get(id);
  }

  async createFramework(insertFramework: InsertFramework): Promise<Framework> {
    const id = insertFramework.id || randomUUID();
    const framework: Framework = { ...insertFramework, id };
    this.frameworks.set(id, framework);
    return framework;
  }

  // Resource methods
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourcesByType(type: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.type === type);
  }

  async getResourcesByFramework(frameworkId: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.frameworkId === frameworkId);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = insertResource.id || randomUUID();
    const resource: Resource = { ...insertResource, id };
    this.resources.set(id, resource);
    return resource;
  }

  // Selector question methods
  async getSelectorQuestions(): Promise<SelectorQuestion[]> {
    return Array.from(this.selectorQuestions.values()).sort((a, b) => a.order - b.order);
  }

  async createSelectorQuestion(insertQuestion: InsertSelectorQuestion): Promise<SelectorQuestion> {
    const id = insertQuestion.id || randomUUID();
    const question: SelectorQuestion = { ...insertQuestion, id };
    this.selectorQuestions.set(id, question);
    return question;
  }

  // Framework comparison methods
  async getFrameworkComparisons(): Promise<FrameworkComparison[]> {
    return Array.from(this.frameworkComparisons.values()).sort((a, b) => a.order - b.order);
  }

  async createFrameworkComparison(insertComparison: InsertFrameworkComparison): Promise<FrameworkComparison> {
    const id = insertComparison.id || randomUUID();
    const comparison: FrameworkComparison = { ...insertComparison, id };
    this.frameworkComparisons.set(id, comparison);
    return comparison;
  }

  // Search method
  async searchContent(query: string): Promise<{frameworks: Framework[], resources: Resource[]}> {
    const lowercaseQuery = query.toLowerCase();
    
    const frameworks = Array.from(this.frameworks.values()).filter(framework =>
      framework.name.toLowerCase().includes(lowercaseQuery) ||
      framework.fullName.toLowerCase().includes(lowercaseQuery) ||
      framework.description.toLowerCase().includes(lowercaseQuery) ||
      framework.focusAreas.some(area => area.toLowerCase().includes(lowercaseQuery)) ||
      framework.keyFeatures.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    );

    const resources = Array.from(this.resources.values()).filter(resource =>
      resource.title.toLowerCase().includes(lowercaseQuery) ||
      resource.description.toLowerCase().includes(lowercaseQuery) ||
      resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );

    return { frameworks, resources };
  }
}

export const storage = new MemStorage();
