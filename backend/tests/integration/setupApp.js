import express from "express";
import authRoutes from "../../src/routes/auth.routes.js";
import productRoutes from "../../src/routes/product.routes.js";
import commentRoutes from "../../src/routes/comment.routes.js";
import userRoutes from "../../src/routes/users.routes.js";
import orderRoutes from "../../src/routes/order.routes.js";

export const createTestApp = () => {
  const app = express();
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/orders", orderRoutes);

  return app;
};
