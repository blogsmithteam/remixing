# Text Remixer

A content remixing tool using React.

## Features

1. User inputs text they want to remix.
2. Click a button to apply the remix.
3. Send the request to an AI API endpoint (Claude).
4. See the remixed text in an output box.
5. Add other styling and features as desired when building new versions.

## Tech Stack

1. React
2. Tailwind CSS
3. Vercel
4. Claude API

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your Claude API key to the environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory and add your Claude API key:

CLAUDE_API_KEY=your_api

## Challenges

1. Add in another AI API
2. Add a way to upload audio files to have them transcribed.
3. Cick to tweet or schedule a tweet from the output.
4. Add a way to save the remixed output to a database.

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!