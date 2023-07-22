import { AuthModule, CategoryModule, OrderModule, ProductModule, SubcategoryModule } from './module';
import { dbConfig } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
   imports: [
      ConfigModule.forRoot({
         load: [dbConfig],
         isGlobal: true
      }),
      AuthModule,
      CategoryModule,
      SubcategoryModule,
      ProductModule,
      OrderModule,
   ]
})
export class App { }
