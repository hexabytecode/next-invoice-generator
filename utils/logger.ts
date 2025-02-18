import winston from "winston";
import { env } from "@/config/env";

const { combine, timestamp, printf, colorize, align } = winston.format;

export const logger = winston.createLogger({
  level: env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
    align(),
    printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize({ all: true })),
    }),
    new winston.transports.File({
      filename: "logs/app.log",
      level: "error",
    }),
  ],
});
