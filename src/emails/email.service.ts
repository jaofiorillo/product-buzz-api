import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailEntity } from './email.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { readFile } from 'fs/promises';

@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(EmailEntity)
        private readonly emailRepository: Repository<EmailEntity>,
    ) {}

    private transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    async sendEmail(subject: string, variables: any): Promise<void> {
        const emails = await this.getAllEmails();
        const html = await renderTemplate(variables);

        await this.transporter.sendMail({
            from: `"Product buzz" <${process.env.EMAIL_USER}>`,
            to: emails,
            subject,
            html,
        });
    }

    async create(email: string) {
        const new_email = new EmailEntity();
        new_email.email = email;
        await this.emailRepository.save(new_email);
    }

    async getAllEmails() {
        const emails = await this.emailRepository.find({
            select: ['email'],
        });

        return emails.map((e) => e.email).join(', ');
    }
}

async function renderTemplate(variables: any): Promise<string> {
    const filePath = path.resolve(
        process.cwd(),
        'dist/emails/templates/email-template.html',
    );

    try {
        console.log(filePath);
        const templateFile = await readFile(filePath, 'utf-8');
        const compiledTemplate = handlebars.compile(templateFile);
        return compiledTemplate(variables);
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            throw new Error(`Template file not found: ${filePath}`);
        }
        throw err;
    }
}
