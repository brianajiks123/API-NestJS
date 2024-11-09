import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from "@nestjs/common";
import { AddressService } from "./address.service";
import { Auth } from '../common/auth.decorator';
import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest } from "../model/address.model";
import { WebResponse } from '../model/web.model';

@Controller("/api/contacts/:contactId/addresses")
export class AddressController {
    constructor(private addressService: AddressService) {}

    @Post()
    @HttpCode(200)
    async create(@Auth() user: User, @Param("contactId", ParseIntPipe) contactId: number, @Body() request: CreateAddressRequest): Promise<WebResponse<AddressResponse>> {
        request.contact_id = contactId;
        const result = await this.addressService.create(user, request);

        return {
            data: result
        };
    }

    @Get("/:addressId")
    @HttpCode(200)
    async get(
        @Auth() user: User,
        @Param("contactId", ParseIntPipe) contactId: number,
        @Param("addressId", ParseIntPipe) addressId: number
    ): Promise<WebResponse<AddressResponse>> {
        const request: GetAddressRequest = {
            address_id: addressId,
            contact_id: contactId
        };
        const result = await this.addressService.get(user, request);

        return {
            data: result
        };
    }
}