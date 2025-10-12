# About This Web Application

**Truthly** is an anonymous messaging web application inspired by platforms like _Sarahah_.  
It allows users to receive honest messages or feedback from others — completely anonymously and without fear of judgment.

The app focuses on **privacy, simplicity, and modern UI/UX**.  
Users can:

- Create an account using secure **OTP verification**.
- Receive anonymous messages through their unique shareable link.
- Browse, delete, or manage received messages from their personal dashboard.
- Explore a clean and responsive interface with smooth navigation.

# Tech Stack

This project is built using a modern frontend and backend setup:

| Layer            | Technology                         |
| ---------------- | ---------------------------------- |
| Frontend         | **Next.js 15** (App Router)        |
| Styling          | **Tailwind CSS** + **shadcn/ui**   |
| State Management | **Redux Toolkit**                  |
| Authentication   | **OTP Verification** (Email based) |
| Database         | **MongoDB** (with Mongoose ORM)    |
| API              | **Nodejs **                        |
| Deployment       | **Vercel**                         |

---

# Features

- Secure OTP-based authentication
- Anonymous message sharing system
- Intuitive and responsive UI
- Real-time message updates
- Optimized for mobile and desktop
- Pixel-perfect design following Figma reference

# How It Works

1. **User Registration**  
   The user signs up using an email or phone number and verifies via OTP.

2. **Shareable Profile Link**  
   After verification, each user gets a unique link to share publicly.

3. **Receiving Messages**  
   Anyone with the link can send an anonymous message — no login required.

4. **Profile Dashboard**  
   The user can view, manage, or delete received messages securely.

---

# Development Setup

1- Clone the repository

```bash
    git clone https://github.com/ahmedtarekwork/saraha.git
```

2- Install dependencies

```bash
    npm install
```

3- Run the development server

```bash
    npm run dev
```

4- visit the local server url http://localhost:5500

- If You want to change the post you can do that by:

  - open package.json file, it's inside the root directory of the project

  - In the **"scripts"** object, You will find **"dev"** property

  ```bash
        "scripts": {
          "dev": "next dev -p 5500",
           ...
        },
  ```

  - change the **-p** flag to the post number You want

  ```bash
        "scripts": {
          "dev": "next dev -p <NEW_PORT>",
          ...
        },
  ```

# Authors

Developed with ❤️ by :

- [Ahmed Tarek](https://ahmed-profile.vercel.app)

  Frontend Developer, made the frontend of this project with Nextjs.

- [Lamia Fekry](https://ahmed-profile.vercel.app)

  Fullstack Developer, developed the Nodejs API and manage the MongoDB for this project.
