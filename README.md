# Folio — Portfolio Showcase SPA

A modern, responsive single-page application for showcasing creative and development projects. Built with React, React Router, and CSS Modules.

## Features

- **Landing page** with hero section and filterable project grid
- **Add project** form with validation, emoji picker, and local persistence
- **Project detail** view with tech stack, live link, and delete action
- **Client-side routing** via React Router v6
- **Filter bar** by category or featured status
- **Toast notifications** for user feedback
- **localStorage persistence** — projects survive page reloads
- **Responsive design** — mobile-first, works on all screen sizes

## Tech Stack

- React 18
- React Router v6
- CSS Modules
- Vite

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .module.css      # Sticky navigation
│   ├── ProjectCard.jsx / .module.css # Individual project card
│   ├── FilterBar.jsx / .module.css   # Category filter chips
│   ├── EmojiPicker.jsx / .module.css # Icon selection grid
│   └── Toast.jsx                     # Notification banner
├── hooks/
│   ├── useProjects.js   # State + localStorage for projects
│   └── useToast.js      # Toast notification state
├── pages/
│   ├── Home.jsx / .module.css          # Landing page
│   ├── AddProject.jsx / .module.css    # Add project form
│   └── ProjectDetail.jsx / .module.css # Detail view
├── data/
│   └── projects.js   # Sample data, constants, category map
├── styles/
│   └── global.css    # CSS variables, reset, global styles
├── App.jsx           # Root component with routes
└── main.jsx          # React entry point
```

## Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── Home
│   │   ├── FilterBar
│   │   └── ProjectCard (×n)
│   ├── AddProject
│   │   └── EmojiPicker
│   └── ProjectDetail
└── Toast
```

## State Management

- `useProjects` — custom hook managing the projects array with `localStorage` persistence. Exposes `addProject`, `deleteProject`, and derived stats.
- `useToast` — custom hook for transient notification messages with auto-dismiss.
- `Home` — local `useState` for the active filter (not shared globally as it's only used here).
- `AddProject` — local `useState` for controlled form fields and validation errors.

## Known Limitations

- No backend — data is stored in `localStorage` only (cleared if browser storage is cleared)
- Image uploads are not supported; projects use emoji icons instead
- No authentication or user accounts
