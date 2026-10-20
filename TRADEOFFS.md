# Trade-offs: Civil Engineering Portal

## 1. One full stack app
- **Chose:** Next.js API routes in the same project
- **Over:** a separate backend
- **Why:** one codebase and one deploy for a small team.
- **Cost:** the API scales with the web app, not on its own.

## 2. Sessions
- **Chose:** a JWT in an httpOnly cookie
- **Over:** server side session storage
- **Why:** no session store needed, and middleware can verify it fast.
- **Cost:** a token cannot be revoked before it expires.

## 3. Route protection
- **Chose:** checks in `middleware.js`
- **Over:** checks inside each page
- **Why:** one place to guard every dashboard route.
- **Cost:** API routes still need their own checks.

## 4. Database
- **Chose:** MongoDB with Mongoose
- **Over:** a SQL database
- **Why:** quick to model and free on Atlas.
- **Cost:** fewer guarantees for related data like results.

## 5. Admin accounts
- **Chose:** a seed script
- **Over:** an admin signup page
- **Why:** nobody can register themselves as admin.
- **Cost:** adding an admin needs terminal access.
