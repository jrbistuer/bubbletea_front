# BubbleteaFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Environments

The app ships with two environments, swapped at build time via `fileReplacements` in `angular.json`:

| File                                  | Used by       | Bubble teas endpoint                              |
| ------------------------------------- | ------------- | ------------------------------------------------- |
| `src/environments/environment.ts`     | `development` | `http://127.0.0.1:8000/bubbleteas`                |
| `src/environments/environment.prod.ts`| `production`  | `https://bubbletea-az5g.onrender.com/bubbleteas`  |

### Working against the dev backend

Make sure the local FastAPI server is running on `http://127.0.0.1:8000`, then:

```bash
npm run start:dev
```

This runs `ng serve --configuration development --open` and uses `environment.ts`.

### Working against the prod backend

To run the app locally but hit the deployed Render backend (useful for smoke-testing before deploying):

```bash
npm run start:prod
```

This runs `ng serve --configuration production --open` and uses `environment.prod.ts`.

### Deploying for prod

1. Build the production bundle:

   ```bash
   npm run build:prod
   ```

   Artifacts are emitted to `dist/bubbletea_front/browser/`.

2. Deploy the contents of `dist/bubbletea_front/browser/` to any static host (Firebase Hosting, Netlify, Vercel, Render Static Site, GitHub Pages, S3 + CloudFront, etc.).

3. Configure the host for SPA routing: any unknown URL must fall back to `index.html` so the Angular router can handle deep links (e.g. `/bubble-tea/3`).

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
