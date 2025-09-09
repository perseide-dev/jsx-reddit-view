# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# REDLY (Reddit Reader UI)

Minimal Reddit reading client built with React 19 + Vite + MUI (dark theme) + Axios + React Router v7. Implements JWT auth, protected dashboard, data listing with pagination and search.

## Tech Stack
- React 19 + Vite
- React Router v7 (nested + protected routes)
- MUI (custom dark theme)
- Axios (global instance + interceptors)
- Context API (auth state)
- Modular alias-based structure

## Architecture Overview

Layered folder structure for separation of concerns:

```
src/
  components/
    templates/          (layout shells: Landing, Session, Dashboard)
    global/             (global UI: NavBar, context)
    pages/              (route-level screens)
      landing/
      session/
      dashboard/
    util/
      auth/             (auth helpers + ProtectedRoute)
      hooks/            (domain hooks: useReddit)
  services/             (API service layer)
  App.jsx               (routing composition)
  main.jsx              (bootstrapping: theme + axios setup)
```

Key files:
- Routing: [src/App.jsx](src/App.jsx)
- Entry + Axios + Theme: [src/main.jsx](src/main.jsx)
- Auth context: [`AuthProvider`](src/components/global/context/AuthContext.jsx)
- Token helpers: [src/components/util/auth/auth.js](src/components/util/auth/auth.js)
- Route guard: [src/components/util/auth/ProtectedRoute.jsx](src/components/util/auth/ProtectedRoute.jsx)
- API services: [src/services/auth.services.js](src/services/auth.services.js), [src/services/reddit.services.js](src/services/reddit.services.js)
- Data hook: [`useReddit`](src/components/util/hooks/useReddit.jsx)
- Templates: [Landing](src/components/templates/Landing.jsx), [Session](src/components/templates/Session.jsx), [Dashboard](src/components/templates/Dashboard.jsx)
- Pages: [LandingHome](src/components/pages/landing/LandingHome.jsx), [SessionLogin](src/components/pages/session/SessionLogin.jsx), [SessionRegister](src/components/pages/session/SessionRegister.jsx), [PostDashboard](src/components/pages/dashboard/postDashboard.jsx)
- Styles baseline: [src/App.css](src/App.css)

## Design System

Theme defined in [src/main.jsx](src/main.jsx):
- Dark palette: primary (#ff5252), secondary (#7cf0ff)
- Background: deep dark gradient / panels (#0a0b0f / #0f1117)
- Rounded shapes (borderRadius 14)
- Gradient typographic accents (see [Session](src/components/templates/Session.jsx), [LandingHome](src/components/pages/landing/LandingHome.jsx))

Global reset: [App.css](src/App.css). Layout shells inject navigation + content via `<Outlet />`.

## Authentication Flow

1. User submits credentials (login or register pages).
2. Service calls: [`postLoginService`](src/services/auth.services.js) / [`postRegisterService`](src/services/auth.services.js).
3. On success token saved via [`saveToken`](src/components/util/auth/auth.js).
4. Context decodes payload (`parseJwt`) inside [`AuthProvider`](src/components/global/context/AuthContext.jsx).
5. Protected sections wrapped by [`ProtectedRoute`](src/components/util/auth/ProtectedRoute.jsx).
6. Axios attaches token automatically (interceptor in [main.jsx](src/main.jsx)); on 401 token cleared.

## Data Fetching

Subreddit listing:
- Hook: [`useReddit`](src/components/util/hooks/useReddit.jsx)
- Service: [`getRedditThreadsService`](src/services/reddit.services.js)
- UI: [`PostDashboard`](src/components/pages/dashboard/postDashboard.jsx) with debounce search (q), pagination (page, limit).

## Environment Variables

File: [.env](.env)

```
VITE_API_BASE_URL=https://js-node-reddit-api.onrender.com
```

You can add:

```
VITE_API_TIMEOUT=10000
```

Restart dev server after changes.

## Local Development

Prerequisites: Node 18+

```
npm install
cp .env .env.local   # (optional) override locally
npm run dev
```

Visit: http://localhost:5173

Build:

```
npm run build
npm run preview
```

Lint:

```
npm run lint
```

## API Endpoints (expected)

Auth:
- POST api/auth/login
- POST api/auth/register

Reddit data:
- GET api/reddits?page={n}&limit={n}&q={term}

(axios `baseURL` prepends `VITE_API_BASE_URL`)

## Deploy (Render Example)

1. Push repository to GitHub.
2. Create new Web Service in Render.
3. Select repo + root path.
4. Set:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview` (or serve with a static host: better use Static Site type)
5. Environment (Static Site faster):
   - Type: Static Site
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. Add environment variable:
   - `VITE_API_BASE_URL=https://your-api-host`
7. Trigger build (deploy).

## Extending

Add a new dashboard sub-page:
1. Create file in `src/components/pages/dashboard/YourPage.jsx`.
2. Add `<Route path="your-page" element={<YourPage/>} />` inside dashboard route in [App.jsx](src/App.jsx).
3. Consume auth or hooks as needed.

## Scripts (from [package.json](package.json))

```
dev       Start Vite dev server
build     Production build
preview   Preview built bundle
lint      Run ESLint
```

## Security

- Client-side auth only (no SSR). Do not store sensitive secrets in the client.
- Token cleared on 401 automatically (see axios interceptor in [main.jsx](src/main.jsx)).
