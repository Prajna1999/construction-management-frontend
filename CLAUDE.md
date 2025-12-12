# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A construction materials inventory management application built with Next.js 16, React 19, and Tailwind CSS 4. The app enables tracking of construction materials, suppliers, purchases, and stock levels with low-stock alerts.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.1
- **TypeScript**: 5.x (strict mode disabled)
- **Styling**: Tailwind CSS 4.1.18 (using `@tailwindcss/postcss`)
- **Font**: Geist (via `next/font`)

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Current State: Single-Page Client Component

The application currently exists as a single client-side React component (`app/page.tsx`) containing:
- All UI components (Dashboard, Materials, Suppliers, Purchases, Stock Check)
- State management via React hooks (useState)
- Mock data for materials, suppliers, purchases, and stock snapshots
- Modal-based forms for CRUD operations
- Bottom navigation for tab switching

### Data Model

The app manages four main entities in-memory:

1. **Materials**: Construction materials with units, categories, and reorder levels
2. **Suppliers**: Vendor contact information and addresses
3. **Purchases**: Transaction records linking suppliers to materials
4. **Snapshots**: Point-in-time stock quantity records

### Path Aliases

The project uses `@/*` to reference root-level imports:
```typescript
// Maps to the project root
import Component from "@/components/foo"
```

### Styling Approach

- Tailwind CSS 4 with inline theme configuration in `app/globals.css`
- Custom CSS variables defined in `:root` for theming
- Inline SVG components for icons (no icon library)
- Responsive design with mobile-first approach
- Dark mode support via `prefers-color-scheme`

## Important TypeScript Configuration

- `strict: false` - TypeScript strict mode is disabled
- `jsx: "react-jsx"` - Uses the new JSX transform (no need to import React)
- Module resolution: `bundler`
- Target: `ES2017`

## Application Structure Notes

### State Management
All state is currently managed in the root `InventoryApp` component using `useState` hooks. Data flows down through props to child render functions.

### Modal System
Forms are displayed in a reusable `Modal` component that renders conditionally based on `showModal` state. Forms include:
- MaterialForm (add/edit materials)
- SupplierForm (add/edit suppliers)
- PurchaseForm (log purchases)
- SnapshotForm (update stock counts)

### Key Calculations
- `getCurrentStock()`: Gets latest stock quantity from snapshots
- `getTotalReceived()`: Sums all purchases for a material
- Low stock detection: Compares current stock against reorder levels
