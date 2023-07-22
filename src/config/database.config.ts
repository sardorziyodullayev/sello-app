import { registerAs } from "@nestjs/config"

declare interface DatabaseConfigOption {
   url?: string
}
export const dbConfig = registerAs<DatabaseConfigOption>('db', (): DatabaseConfigOption => ({
   url: process.env.DATABASE_URL ?? undefined,
}),
)
