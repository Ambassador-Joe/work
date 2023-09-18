//utils/logger.js
import winston from 'winston';

const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info', // Set the logging level (e.g., 'info', 'error', 'debug')
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'app.log' }) // Log to a file (optional)
  ]
});

export default logger;
