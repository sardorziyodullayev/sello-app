import type { User } from "@prisma/client";
import * as jwt from 'jsonwebtoken';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "@prisma";
import { sign, refreshSign } from "@helpers";
import type { SignInRequest, SignOutRequest, SignUpRequest, SignUpResponse } from "./interfaces";

@Injectable()
export class AuthService {
    readonly #_prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma
    }

    async signUp(payload: SignUpRequest): Promise<SignUpResponse> {
        await this.#_checkExistingUser({ username: payload.username })

        const newUser = await this.#_prisma.user.create({
            data: {
                username: payload.username,
                password: payload.password
            },
            select: {
                id: true
            }
        })

        return {
            accessToken: sign({ id: newUser.id }),
            refreshToken: refreshSign({ id: newUser.id })
        }
    }

    async signIn(payload: SignInRequest): Promise<SignUpResponse> {
        const user = await this.#_checkUser({ username: payload.username, password: payload.password })

        return {
            accessToken: await sign({ id: user.id }),
            refreshToken: await refreshSign({ id: user.id })
        }
    }

    async signOut(payload: SignOutRequest): Promise<void> {
        const refreshToken = payload.refreshToken;
        const secretKey = '1q2w3e4r';

        try {
            const decodedToken = jwt.verify(refreshToken, secretKey);
            const { id } = decodedToken as { id: string };

            await this.#_prisma.user.delete({
                where: { id }
              });
            
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async #_checkUser(payload: { username: string, password?: string }): Promise<Pick<User, 'id'>> {
        const user = await this.#_prisma.user.findFirst({
            where: {
                username: payload.username,
                password: payload.password,
                deletedAt: null
            },
            select: {
                id: true
            }
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return {
            id: user.id
        }
    }

    async #_checkExistingUser(payload: { username: string }): Promise<null> {
        const user = await this.#_prisma.user.findFirst({
            where: {
                username: payload.username,
                deletedAt: null
            },
            select: {
                id: true
            }
        })

        if (user) {
            throw new ConflictException('User already exists')
        }

        return null
    }
}
