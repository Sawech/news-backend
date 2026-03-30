import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Suppress NestJS's own verbose startup logs in production
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['log', 'debug', 'error', 'verbose', 'warn'],
  });

  // ── Middleware ────────────────────────────────────────────────────────────
  // cookie-parser enables req.cookies, required by JwtStrategy's cookie extractor
  app.use(cookieParser());

  // ── CORS ──────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:4200',
    credentials: true, // required for the Angular client to send/receive cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ── Global Validation Pipe ────────────────────────────────────────────────
  // - whitelist: strips properties not declared in DTOs
  // - transform: coerces plain query-string values into typed DTO instances
  //   (e.g. "1" → 1 for @IsInt() with @Type(() => Number))
  // - forbidNonWhitelisted: false — query params often include unrecognised keys
  //   from browser extensions / proxies; hard-failing on them is noisy
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  // ── Global Exception Filter ───────────────────────────────────────────────
  // Catches every thrown exception and normalises the response shape:
  // { statusCode, message, error, timestamp, path }
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ── Global Guards ─────────────────────────────────────────────────────────
  // RolesGuard reads @Roles() metadata. It must be registered globally so
  // it applies to every controller automatically. It only acts when
  // @Roles() is present — otherwise it passes through.
  // JwtAuthGuard is intentionally NOT registered globally: public endpoints
  // (GET /api/articles, GET /api/categories, etc.) must remain unauthenticated.
  // Auth is applied per-controller or per-route with @UseGuards(JwtAuthGuard).
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ── Listen ────────────────────────────────────────────────────────────────
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Chronicler API running on http://localhost:${port}`);
  logger.log(`   Environment : ${process.env.NODE_ENV ?? 'development'}`);
}

bootstrap();
