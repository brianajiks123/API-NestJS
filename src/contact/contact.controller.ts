import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { User } from "@prisma/client";
import { ContactResponse, CreateContactRequest } from "../model/contact.model";
import { WebResponse } from "../model/web.model";
import { Auth } from '../common/auth.decorator';

@Controller("api/contacts")
export class ContactController {
    constructor(private contactService: ContactService) {}

    @Post()
    @HttpCode(200)
    async create(@Auth() user: User, @Body() request: CreateContactRequest): Promise<WebResponse<ContactResponse>> {
        const result = await this.contactService.create(user, request);

        return {
            data: result
        };
    }

    @Get("/:contactId")
    @HttpCode(200)
    async get(@Auth() user: User, @Param("contactId", ParseIntPipe) contactId: number): Promise<WebResponse<ContactResponse>> {
        const result = await this.contactService.get(user, contactId);

        return {
            data: result
        };
    }
}