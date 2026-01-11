import express, { type Express, Request, Response } from "express";
import cors from "cors";
import authRoute from './routes/main/auth.route.js'

const app: Express = express();

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders : ["Content-type", "Authorization"]
  }),
);

// routes import
import healthRouter from './routes/health/healthCheck.routes.js'


app.use("/api/v1/healthcheck",healthRouter)

app.use("/api/v1/auth",authRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from backend");
});

export default app;
