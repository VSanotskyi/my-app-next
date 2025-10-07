# My app nextjs

## Installation

### Clone the repository:
```bash

git clone https://github.com/VSanotskyi/my-app-next.git
cd my-app-next
```

### Install dependencies:
```bash

pnpm install
````
or
```bash

npm install
````
or
```bash

yarn
```
*** ***	

## Environment Variables

### Create a .env.local file in the root of the project and add the following:
for production
```env

NEXT_PUBLIC_SUPABASE_URL=your_api_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_api_key
```
for development
```env

NEXT_PUBLIC_LOCAL_SUPABASE_URL=your_api_url
NEXT_PUBLIC_LOCAL_PUBLISHABLE_KEY=your_api_key
```

Make sure all keys are set correctly, otherwise the app will throw an error on startup.
*** ***	

## Development

### Start the development server:
```bash

pnpm dev
```
or
```bash

npm run dev
```
or
```bash

yarn dev
```

Open http://localhost:3000 to view it in the browser.

### Run the production build locally:
```bash

pnpm build
```
or
```bash

npm run build
```
or
```bash

yarn build
```

*** ***

## Running Supabase Locally

If you want to run the database and auth server locally, make sure you have the Supabase CLI installed:  
https://supabase.com/docs/guides/cli

1. **Install Supabase CLI (Mac)**
   ```bash
   brew install supabase/tap/supabase
   ```
   
2. **Check Supabase version**
   ```bash
   supabase --version
   ```
   
3. Authenticate with Supabase (if not done yet)
   ```bash
   supabase login
   ```
   
4. **Initialize local Supabase (if not done yet)**
   ```bash
   supabase init
   ```
   
5. Connect to your Supabase project
   ```bash
   supabase link --project-ref your_project_ref
   ```
   
6. **Create environment variables** <br/>
   Create a `.env` file in the root of the project and add the following:
   ```env
   NEXT_PUBLIC_LOCAL_SUPABASE_URL=your_api_url
   NEXT_PUBLIC_LOCAL_PUBLISHABLE_KEY=your_api_key
   ```

7. **Start Supabase services**
   ```bash
   supabase start
   ```
   If you see errors like "container is not running", try troubleshooting:

    ```bash
    supabase stop
    supabase start debug
    ```
   
8. **Stop Supabase services**
   ```bash
    supabase stop
    ```
*** ***

## Migration
### To create a new migration, run:
```bash

supabase migration new migration_name
```

### To apply migrations, run:
```bash

supabase db push
```

### Link your local project to the remote Supabase project
```bash

supabase link --project-ref your_project_ref
```
### Push migrations to the remote database 
```bash

supabase db push 
```

*** ***

## Folder Structure

```.
├── public/                  # Static files
├── src/
│   ├── app/                 # Application routes and components
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Library files (e.g., Supabase client)
│   ├── theme/               # Mantine theme and styling
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
├── .env                     # Environment variables
├── next.config.ts           # Next.js configuration
├── package.json             # Project metadata and scripts
└── README.md                # Project documentation        
```
