// utils/logger.ts
import winston from "winston";
import { env } from "@/config/env";

const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
  level: env.LOG_LEVEL || "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
