import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import { createLogger } from 'winston';
import * as winston from 'winston';

import { AppModule } from './app.module';
import tracer from './tracer';
import kafkaConfig from './kafkaConfig';

async function bootstrap() {
  tracer.start();

  // Setup JSON logger
  const jsonLogger = createLogger({
    transports: [
      new winston.transports.File({
        filename: 'json.log',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
    ],
  });

  // Setup console logger
  const consoleLogger = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.cli(),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    logger: WinstonModule.createLogger({
      instance: consoleLogger,
    }),
  });

  // Expose GRPC endpoint
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: 'nest_demo',
        protoPath: join(__dirname, 'protos/protobufs/services/users.proto'),
        loader: {
          includeDirs: [join(__dirname, 'protos/protobufs')],
        },
        url: `${process.env.GRPC_URL}:${process.env.GRPC_PORT}`,
      },
    },
    { inheritAppConfig: true },
  );

  // setup connection to Kafka for publishing and consuming
  app.connectMicroservice<MicroserviceOptions>(kafkaConfig);

  await app.startAllMicroservices();
  await app.listen(process.env.HTTP_PORT || 3001);
}
bootstrap();
