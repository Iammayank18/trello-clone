# Trello Clone

A simple trello-like board app built with React + Node.js. You can create tasks, drag them between columns and track priority.

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- @dnd-kit for drag and drop
- react-hook-form + yup for form validation
- axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose

## Getting Started

Make sure MongoDB is running locally on port 27017 first.

Install dependencies for both apps:
```bash
cd server && npm install
cd ../client && npm install
cd ..
npm install
```

Copy the env files and fill them in:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Then run both together from the root:
```bash
npm run dev
```

Server runs on http://localhost:3000 and the client on http://localhost:5173

## Features

- Create / edit / delete tasks
- Drag and drop between columns (todo, in-progress, done)
- Tasks in "done" column can't be dragged
- Priority badges (low / medium / high)
- Form validation with error messages

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | get all tasks |
| POST | /task/create | create a task |
| PUT | /task/update | update a task |
| DELETE | /task/delete/:id | delete a task |

## Notes

- No auth yet, everything is public
- descriptions are optional
- if the server crashes check if mongo is actually running
