import { Injectable } from "@nestjs/common";
import { PrismaService } from "../src/common/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
    constructor(private prismaService: PrismaService) {}

    async deleteUser() {
        await this.prismaService.user.deleteMany({
            where: {
                username: "test1"
            }
        });
    }

    async createUser() {
        await this.prismaService.user.create({
            data: {
                username: "test1",
                name: "test1",
                password: await bcrypt.hash("test1", 10),
                token: "test1"
            }
        });
    }
}