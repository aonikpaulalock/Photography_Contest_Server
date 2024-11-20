import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { router } from './app/routes';
import { GlobalErrorHandler } from './app/middleware/GlobalErrorHandle';
import { NotFoundRoute } from './app/middleware/NotFound';
const app: Application = express();

// perser
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// Use router
app.use("/api", router)

const TestingRouteController = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Successfully Testing Data"
  })
};

app.get("/", TestingRouteController)



// Global Error
app.use(GlobalErrorHandler)

// Not Found Route
app.use(NotFoundRoute)

export default app;
