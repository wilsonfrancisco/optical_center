import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return `${timestamp} ${level}: ${message}${stack ? '\n' + stack : ''}`;
        })
      )
    }),

    new winston.transports.File({
      filename: '../logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: '../logs/combined.log'
    })
  ]
});
