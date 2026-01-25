import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
    private logger: Logger;

    constructor() {
        const isProduction = process.env.NODE_ENV === 'production';

        this.logger = createLogger({
            level: isProduction ? 'info' : 'debug',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.errors({ stack: true }),
                isProduction
                    ? format.json()
                    : format.combine(
                        format.colorize(),
                        format.printf(({ timestamp, level, message, context, ...meta }) => {
                            const ctx = context ? `[${context}]` : '';
                            const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
                            return `${timestamp} ${level} ${ctx} ${message} ${metaStr}`;
                        })
                    )
            ),
            transports: [
                new transports.Console(),
                // Production'da dosyaya da yaz
                ...(isProduction ? [
                    new transports.File({ filename: 'logs/error.log', level: 'error' }),
                    new transports.File({ filename: 'logs/combined.log' }),
                ] : []),
            ],
        });
    }

    log(message: string, context?: string) {
        this.logger.info(message, { context });
    }

    error(message: string, trace?: string, context?: string) {
        this.logger.error(message, { trace, context });
    }

    warn(message: string, context?: string) {
        this.logger.warn(message, { context });
    }

    debug(message: string, context?: string) {
        this.logger.debug(message, { context });
    }

    verbose(message: string, context?: string) {
        this.logger.verbose(message, { context });
    }
}
