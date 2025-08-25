# ESG Framework

### Overview

This project is a web app that helps organizations understand and choose the right ESG (Environmental, Social, and Governance) reporting frameworks. It gives practical guidance on well-known standards like GRI Standards, ESRS, SASB, TNFD, and the UN Global Compact.

With this app, users can:

Explore details of each framework

Compare different reporting standards

Access learning resources

Use an interactive tool to find the best-fit framework for their needs

# System Architecture

### Frontend 

React Single Page App built with TypeScript

UI Components: shadcn/ui + Radix UI for accessibility

Styling: Tailwind CSS with custom ESG-themed design system

Routing: Wouter for fast, lightweight navigation

State Management: TanStack Query (React Query)

Build Tool: Vite for speedy development and optimized builds

### Bakend

Node.js + Express.js with TypeScript

RESTful API for frameworks, resources, comparisons, and framework selector

Error Handling with centralized middleware and proper status codes

Vite Middleware for smooth dev experience

### Database

PostgreSQL managed with Drizzle ORM

Schema: Tables for frameworks, resources, selector questions, and comparisons

Migrations: Managed with Drizzle Kit

Dev Mode: In-memory DB with preloaded data

### Authentication & Security

Sessions stored in PostgreSQL with connect-pg-simple

Middleware for logging and secure headers

### Components

Modular UI System with reusable ESG-styled components

Navbar & Footer with responsive layouts

Feature Components for framework cards, comparisons, quizzes, and resources

Accessibility baked in with ARIA and semantic HTML

### Search & Discovery

Fuse.js for client-side fuzzy search

Filters for framework type, categories, and tags

Interactive Questionnaire to guide framework selection

### Development & Build

TypeScript everywhere (frontend, backend, shared models)

Path Aliases for cleaner imports

Dev Tools: Runtime error overlay

Production Build: Optimized with ESBuild

# External Dependencies

### Database

Neon (PostgreSQL hosting via @neondatabase/serverless)

Drizzle ORM for type-safe database work

### UI & Styling

Radix UI for accessible components

Tailwind CSS with custom tokens

Lucide React for icons

Google Fonts (Inter) for typography

### Frontend Libraries

TanStack Query for data fetching & caching

React Hook Form for forms + validation

Date-fns for date handling

Embla Carousel for interactive slides

### Development Tools

Vite as build tool & dev server

ESBuild for fast bundling

TypeScript for type safety

PostCSS + Autoprefixer for CSS processing

### Search & Utilities

Fuse.js for search

clsx & class-variance-authority for styling logic

nanoid for unique IDs

### App Integration

vite-plugin-runtime-error-modal for better debugging

### Getting Started
Prerequisites

Node.js (LTS)

PostgreSQL (local or Neon cloud)

```
Install & Run
# Install dependencies
npm install

# Start development server
npm run dev

```

