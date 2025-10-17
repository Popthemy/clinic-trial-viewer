# ClinicalTrials Info Extractor

This project is a web application built with Next.js that extracts and displays clinical trial information from [ClinicalTrials.gov](https://clinicaltrials.gov).

## Features

- Fetch clinical trial data from ClinicalTrials.gov.
- Display essential trial details like title, status, location, etc.
- Simple, clean UI for easy viewing of clinical trial information.

## Requirements

Before running this project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Installation

Follow these steps to set up the project on your local machine:

1. Clone this repository:

````

2. Navigate into the project directory:

   ```bash
   cd clinical-trials-dashboard   ```

3. Install the required dependencies:

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

## Running the Application

Once the dependencies are installed, you can start the development server:

1. Start the development server:

   Using npm:

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

2. Open your browser and visit `http://localhost:3000` to view the app.

## Fetching Data from ClinicalTrials.gov

The app fetches data from the ClinicalTrials.gov API and displays it. The basic data includes trial name, phase, location, and status. You can modify the API call based on your needs by exploring the `pages/index.js` (or wherever the API fetching happens).

## Deployment

To deploy this project, you can use platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Both support Next.js applications natively.

### Example: Deploy to Vercel

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/), sign in, and create a new project.
3. Select the GitHub repository.
4. Follow the prompts to deploy your app.
````

## ✅ Color Style Guide Recap

| Token Category                  | Purpose                                          |
| ------------------------------- | ------------------------------------------------ |
| `--background`                  | Main background of the app or page               |
| `--foreground`                  | Default text color on backgrounds                |
| `--card`                        | Surfaces: cards, modals, sheets                  |
| `--popover`                     | Floating overlays (dropdowns, tooltips)          |
| `--primary`                     | Main action buttons, highlights                  |
| `--secondary`                   | Secondary actions, less emphasized               |
| `--muted`                       | Low-importance surfaces or text                  |
| `--accent`                      | Decorative, callout colors                       |
| `--destructive`                 | Danger or destructive actions (e.g. delete)      |
| `--border`, `--input`, `--ring` | Input outlines, focus indicators                 |
| `--chart-*`                     | Data visualization colors (e.g., bar/pie charts) |
| `--sidebar-*`                   | Sidebar elements and structure                   |
