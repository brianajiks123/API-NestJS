import { HttpException, Inject, Injectable, Logger } from "@nestjs/common";
import { Contact, User } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "../common/prisma.service";
import { ContactResponse, CreateContactRequest } from '../model/contact.model';
import { ValidationService } from '../common/validation.service';
import { ContactValidation } from "./contact.validation";

@Injectable()
export class ContactService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ) {}

    toContactResponse(contact: Contact): ContactResponse {
        return {
            id: contact.id,
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone
        }; 
    }

    async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        this.logger.debug(`ContactService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`);
        const createRequest: CreateContactRequest = this.validationService.validate(ContactValidation.CREATE, request);
        const contact = await this.prismaService.contact.create({
            data: {
                ...createRequest,
                ...{ username: user.username }
            }
        });

        return this.toContactResponse(contact);
    }

    async get(user: User, contactId: number): Promise<ContactResponse> {
        const contact = await this.prismaService.contact.findFirst({
            where: {
                username: user.username,
                id: contactId
            }
        });

        if (!contact) {
            throw new HttpException("Contact is not found", 404);
        }

        return this.toContactResponse(contact);
    }
}
