import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import tracer from './tracer';
import { join } from 'path';

async function bootstrap() {
  tracer.start();
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: 'nest_demo',
        protoPath: join(__dirname, 'protos/protobufs/users.proto'),
        // url - lets you set the port to expose to grpc <default localhost:5000>
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
