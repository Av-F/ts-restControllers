// imports for express and filesystem
import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, "users.json");

// Helper to read file
function readUsers(): any[] {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8"); // initialize empty
  }
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

// Helper to write file
function writeUsers(users: any[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
}

// Endpoints

// GET all users
app.get("/users", (req: Request, res: Response) => {
  const users = readUsers();
  res.json(users);
});

// POST create user
app.post("/users", (req: Request, res: Response) => {
  const users = readUsers();
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const newUser = { id: Date.now(), name };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// GET one user
app.get("/users/:id", (req: Request, res: Response) => {
  const users = readUsers();
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// PUT update user
app.put("/users/:id", (req: Request, res: Response) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  users[index].name = req.body.name || users[index].name;
  writeUsers(users);
  res.json(users[index]);
});

// DELETE user
app.delete("/users/:id", (req: Request, res: Response) => {
  let users = readUsers();
  const newUsers = users.filter(u => u.id !== Number(req.params.id));
  if (newUsers.length === users.length) {
    return res.status(404).json({ error: "User not found" });
  }

  writeUsers(newUsers);
  res.status(204).send();
});

// Start server 
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
