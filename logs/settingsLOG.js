import winston from "winston"

const logger = winston.createLogger({
   format: winston.format.printf(info => {
      return `${new Date()} : ${info.level.toUpperCase()} : ${info.message}`
   }),
   level: "info",
   defaultMeta: { service: 'user-service' },
   transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
   ],
})

export { logger }
