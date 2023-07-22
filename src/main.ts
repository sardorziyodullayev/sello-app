import { appConfig } from '@config';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { App } from './app';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@filters';

setImmediate(async () => {
   const app = await NestFactory.createMicroservice<TcpOptions>(App, {
      transport: Transport.TCP,
      options: appConfig.options
   })

   app.useGlobalFilters(new AllExceptionsFilter())
   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         stopAtFirstError: true
      })
   )
   await app.listen();
})
