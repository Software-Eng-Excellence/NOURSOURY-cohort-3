import winston from "winston";
import config from "../config";

const {logDir, isDev} = config;

const logFileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.splat(),
    winston.format.errors({ stack: true })
)

const logConsoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({format: "HH:mm:ss"}),
    winston.format.splat(),
    winston.format.errors({stack: true}),
    winston.format.printf(({timestamp, level, message, stack}) => {
        return `[${timestamp}] ${level}: ${message} ${stack || ""}`;
    })
)

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.File({
            filename: "error.log", level: "error", dirname:logDir ,format: logFileFormat}),
        new winston.transports.File({
            filename: "all.log", dirname: logDir, format: logFileFormat
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: "exceptions.log", dirname: logDir
        })
    ]
});

if (isDev) {
    logger.add(new winston.transports.Console({
        format: logConsoleFormat
    }));
    logger.level = "debug";
}

export default logger;