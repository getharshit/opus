# DevForms Documentation

A modern, AI-powered form builder built with Next.js, Prisma, and Ollama. Create, customize, and preview beautiful forms in minutes using AI assistance.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [API Reference](#api-reference)
6. [Database Schema](#database-schema)
7. [Development Guide](#development-guide)
8. [Troubleshooting](#troubleshooting)
9. [Contributing](#contributing)
10. [License](#license)

---

## Project Overview

**DevForms** is a full-stack web application for building and sharing forms, powered by AI for rapid form generation. Users can describe the form they want, and the system generates a customizable form structure, which can be further edited and styled.

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL
- **AI Integration:** Ollama (local LLM server)
- **Drag & Drop:** @hello-pangea/dnd
- **Validation:** zod, react-hook-form

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun
- PostgreSQL database
- [Ollama](https://ollama.com/) running locally for AI features

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd devformsv1
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your database and Ollama settings.

4. **Set up the database:**
   ```sh
   npx prisma db push
   npx prisma generate
   ```

5. **Run the development server:**
   ```sh
   npm run dev
   ```

6. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
devformsv1/
  ├── src/
  │   ├── app/                # Next.js app directory (pages, API routes)
  │   ├── components/         # React UI components
  │   │   └── form-builder/   # Form builder UI and logic
  │   ├── lib/                # Utilities, AI, and DB logic
  │   ├── types/              # TypeScript types
  │   └── generated/          # Generated Prisma client
  ├── prisma/
  │   └── schema.prisma       # Prisma schema
  ├── public/                 # Static assets
  ├── package.json
  ├── next.config.ts
  ├── tsconfig.json
  └── README.md
```

### Key Files & Folders

- **src/app/**: Main app, API endpoints, and pages.
- **src/components/form-builder/**: All UI for building and editing forms.
- **src/lib/ai/**: AI integration (Ollama client, form generation logic).
- **src/lib/db/**: Prisma client setup.
- **src/types/**: Shared TypeScript types for forms and responses.
- **prisma/schema.prisma**: Database schema for forms and responses.

---

## Core Features

### 1. **AI-Powered Form Generation**
- Users describe the form they want in natural language.
- The system uses Ollama (local LLM) to generate a form structure (title, description, fields).

### 2. **Form Builder UI**
- Drag-and-drop question reordering.
- Add, edit, and remove questions of various types (text, multiple choice, dropdown, rating, date).
- Live preview and settings for form customization (theme color, title, description).

### 3. **Database Integration**
- Forms and responses are stored in PostgreSQL via Prisma ORM.
- API endpoints for creating, updating, and fetching forms.

---

## API Reference

### **Form Endpoints**

#### `POST /api/forms`
Create a new form.
- **Body:** `{ title, description, fields, theme, prompt }`
- **Returns:** The created form object.

#### `GET /api/forms/[id]`
Fetch a form by ID.
- **Returns:** The form object or 404 if not found.

#### `PUT /api/forms/[id]`
Update a form by ID.
- **Body:** Partial form fields to update.
- **Returns:** The updated form object.

### **AI Endpoint**

#### `POST /api/ai/generate-form`
Generate a form structure from a prompt.
- **Body:** `{ prompt: string }`
- **Returns:** `{ title, description, fields }` (generated form structure)

---

## Database Schema

Defined in `prisma/schema.prisma`:

### **Form**
| Field       | Type     | Description                       |
|-------------|----------|-----------------------------------|
| id          | String   | Unique form ID (cuid)             |
| title       | String   | Form title                        |
| description | String?  | Form description                  |
| prompt      | String?  | Original AI prompt                |
| fields      | Json     | Form fields (array of questions)  |
| theme       | Json     | Theme settings (colors, fonts)    |
| createdAt   | DateTime | Creation timestamp                |
| updatedAt   | DateTime | Last update timestamp             |

### **Response**
| Field       | Type     | Description                       |
|-------------|----------|-----------------------------------|
| id          | String   | Unique response ID (cuid)         |
| formId      | String   | Linked form ID                    |
| data        | Json     | Response data                     |
| submittedAt | DateTime | Submission timestamp              |
| ipAddress   | String?  | IP address of submitter           |

---

## Development Guide

### **Adding a New Field Type**
1. Update `FormField` type in `src/types/form.ts`.
2. Add UI logic in form builder components (sidebar, editor, preview).
3. Update AI prompt template if needed.

### **AI Integration**
- Ollama client is configured in `src/lib/ai/ollama-client.ts`.
- The model and base URL can be set via environment variables.

### **Styling**
- Uses Tailwind CSS for rapid UI development.
- Theme color can be customized per form.

### **Testing & Linting**
- Lint: `npm run lint`
- (Add your own test setup as needed.)

---

## Troubleshooting

- **Prisma Client Not Generated:**  
  Run `npx prisma generate` after changing the schema.
- **Database Connection Issues:**  
  Check your `.env` and ensure PostgreSQL is running and accessible.
- **Ollama Connection Refused:**  
  Make sure Ollama is running and accessible at the configured URL.
- **Dependency Conflicts:**  
  Use compatible versions of React and other libraries as specified in `package.json`.

---

## Contributing

1. Fork the repo and create your branch.
2. Make your changes and add tests if needed.
3. Run linting and ensure the app builds.
4. Submit a pull request with a clear description.

---

## License

Specify your license here (MIT, Apache, etc.).

---

**This documentation can be further expanded with more usage examples, screenshots, and advanced customization guides as needed.**
