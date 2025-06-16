import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/decorators/decorators';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post()
    @Public()
    async create(@Body('email') email: string) {
        await this.emailService.create(email);
    }

    @Get()
    @Public()
    async getAll() {
        return this.emailService.getAllEmails();
    }
}
