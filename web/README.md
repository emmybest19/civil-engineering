# Civil Engineering Portal (Next.js)

Full-stack department portal: public site + role-based dashboards (student / teacher / admin),
built with **Next.js (App Router)**, **MongoDB/Mongoose**, **JWT auth**, and **Tailwind CSS**.
Package manager: **pnpm**.

## Stack

- Next.js 16 (App Router, JavaScript)
- React 19
- Tailwind CSS v4 (green/gold theme)
- MongoDB + Mongoose
- Auth: JWT in httpOnly cookies (`jose`) + bcrypt password hashing
- Route protection via `src/middleware.js`

## Getting started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure environment — copy `.env.example` to `.env.local` and fill in:

   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/civil-engineering-portal
   JWT_SECRET=<random string>
   ```

   Generate a secret with:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
   ```

   You need a running MongoDB (local install or a free MongoDB Atlas cluster).

3. (Optional) Seed an admin account — admins can't self-register:

   ```bash
   pnpm seed:admin "Admin Name" admin@example.com yourpassword
   ```

4. Run the dev server:

   ```bash
   pnpm dev
   ```

   Open http://localhost:3000

## Structure

```
src/
  app/
    (public)/            Public site (shares Navbar + Footer layout)
      page.js            Home
      about/             About
      lecturers/         Lecturer directory
      students/          Student directory
      login/  register/  Auth pages
    dashboard/
      layout.js          Sidebar shell (role-aware nav)
      page.js            Redirects to the role's dashboard
      student/ teacher/ admin/   The three dashboards
    api/auth/            register · login · logout · me
  components/            Reusable UI (Navbar, Card, Modal, ...)
  lib/                   db.js · auth.js · session.js
  models/                User · Lecturer · Announcement · Result
  middleware.js          Protects /dashboard/* by role
```

## Auth & roles

- Visitors register as **student** or **teacher**; **admin** accounts are seeded.
- On login/register a signed JWT is stored in an httpOnly `session` cookie.
- `src/middleware.js` redirects unauthenticated users to `/login` and keeps each
  role inside its own `/dashboard/<role>` section.

## Next steps (not yet implemented)

The dashboards render overview shells. Data CRUD (results upload, announcements,
lecturer/student management) needs API routes under `src/app/api/` plus the
sidebar sub-pages. Models are already defined in `src/models/`.
