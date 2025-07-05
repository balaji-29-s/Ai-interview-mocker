# 🧠 AI Interview Mocker

**AI Interview Mocker** is an AI-powered platform designed to simulate real interview environments, helping users practice and prepare with confidence. This web app uses advanced AI models to conduct interviews, evaluate user responses, and offer insightful feedback for continuous improvement.

> 🌐 **Live Demo**: [Visit Now](https://ai-interview-mocker-lm6s3lbk2-kingbalaji4254-gmailcoms-projects.vercel.app/sign-in?redirect_url=https%3A%2F%2Fai-interview-mocker-lm6s3lbk2-kingbalaji4254-gmailcoms-projects.vercel.app%2Fdashboard)

---

## ✨ Features

* 🧠 AI-generated mock interview questions
* 🎧 Voice-enabled interaction (Microphone support)
* 📊 AI-generated feedback with scoring and improvement tips
* 📁 Dashboard for managing past interview sessions
* 🔐 Secure authentication using Clerk (Google, Facebook, Email)
* 📱 Mobile responsive, modern UI

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/713b3c15-0fe2-4e68-9ee0-521e3404e510)


---

## 🧰 Tech Stack

* **Frontend**: [Next.js 14 (App Router)](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
* **Backend**: Vercel Edge Functions, [Drizzle ORM](https://orm.drizzle.team/)
* **Authentication**: [Clerk.dev](https://clerk.dev/)
* **AI**: [Gemini 1.5 flash (Google Generative AI)](https://ai.google.dev/)
* **Database**: postgresql 
* **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/balaji-29-s/ai-interview-mocker.git
cd ai-interview-mocker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root folder:

```env
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_google_generative_ai_key
DATABASE_URL=your_database_url
```

> 🔑 Make sure to set up Clerk and Google AI accounts to generate the required API keys.

### 4. Run the Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## 🔐 Authentication Setup (Clerk)

1. Create an account at [Clerk.dev](https://clerk.dev)
2. Set up your application and enable:

   * Google OAuth
   * Facebook OAuth
   * Email authentication
3. Copy your **Publishable Key** and **Secret Key** into `.env.local`

---

## 🛋️ Project Structure

```
ai-interview-mocker/
├── app/                  # App routes (App Router)
│   ├── dashboard/        # Dashboard logic
│   ├── sign-in/          # Sign-in route
│   └── page.jsx          # Home route
├── components/           # Reusable UI components
├── utils/                # DB + AI logic (Gemini, Drizzle setup)
├── public/               # Static assets (icons, images)
├── styles/               # Global styles (if needed)
├── .env.local            # Env variables (not committed)
└── README.md             # Project readme
```

---

## 📡 Deployment (Vercel)

> ✅ Already deployed on Vercel!

### Manual Deployment

1. Push your code to GitHub
2. Import the GitHub repo to Vercel
3. Set environment variables in the **Vercel Dashboard**
4. Deploy!

Your app will be available at:

```bash
https://ai-interview-mocker-[hash]-[your-name].vercel.app
```

---

## 🛡️ Security

* Clerk handles all sensitive user auth
* All API keys and secrets are managed using `.env.local` and never exposed
* AI feedback is generated securely via backend APIs

---

## 👤 Author

**Balaji S**
📧 Email: `kingbalaji4254@gmail.com`
🔗 GitHub: [@balaji-29-s](https://github.com/balaji-29-s)

---

## 📃 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute with proper attribution.

---

## ⭐ Feedback & Contribution

If you like this project, please consider giving it a ⭐ on [GitHub](https://github.com/balaji-29-s/ai-interview-mocker)!

Pull requests and suggestions are welcome!

---

> “Practice like you’ve never won. Perform like you’ve never lost.” — AI Interview Mocker 🎯
