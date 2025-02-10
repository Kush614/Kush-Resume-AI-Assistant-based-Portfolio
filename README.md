
# Kush-Resume-AI-Assistant-based-Portfolio

An AI-powered portfolio designed to showcase your skills, projects, and resume dynamically. This project integrates the **Gemini API** to provide an intelligent and personalized experience for visitors.

#Live Deployment: https://kzmoflzdp6o2ksbio7e7.lite.vusercontent.net/

#Edit: I have hit the Gemini API Free tier limit below I have attached video for implementation.

[![Watch the video](https://img.youtube.com/vi/tUBNo4ri8RE/0.jpg)](https://youtu.be/tUBNo4ri8RE)

## Features
- **Gemini API Integration**: Leverages advanced AI capabilities for dynamic resume interaction and personalization.
- **Interactive Assistant**: Visitors can query your resume, projects, and skills interactively.
- **Dynamic Content Management**: Automatically updates portfolio content based on project data.
- **Responsive Design**: Optimized for all screen sizes.
- **Built with Next.js**: Server-side rendering and optimized performance.
- **Customizable Resume and Projects**: Easily modify sections to keep content up-to-date.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Next.js API routes
- **AI Integration**: Gemini API
- **Deployment**: Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kush614/Kush-Resume-AI-Assistant-based-Portfolio.git
   cd Kush-Resume-AI-Assistant-based-Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env.local` file in the root directory and add the following:
   ```env
   GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_SITE_URL=your-site-url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Visit the app in your browser at:
   ```
   http://localhost:3000
   ```

## Configuration
- **Update Resume Data**: Edit the `data/resume.json` file to add or update your resume content.
- **Modify Gemini API Prompts**: Adjust AI behavior by configuring requests in `utils/gemini-handler.js`.

## Deployment
1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Link the repository to Vercel and deploy:
   - Go to [Vercel Dashboard](https://vercel.com/).
   - Import the project from GitHub.
   - Set up environment variables in Vercel's settings.

3. Visit your live portfolio at the deployment URL provided by Vercel.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).
