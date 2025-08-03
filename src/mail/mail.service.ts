import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {ClaimDto} from "../dtos/Claim.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class MailService {
    constructor(
        private readonly mailService: MailerService,
        private readonly configService: ConfigService
    ) {}

    sendMail(claim: ClaimDto) {

        const message = this.mailService.sendMail({
            from: `${this.configService.get('SMTP_USER')}`,
            to: `${this.configService.get('SMTP_USER')}`,
            subject: 'Новая заявка с сайта "Технологии комфорта"',
            html: `
                <div>
                    <h1>Новая заявка!</h1>
                    ${claim.firstName ? `<p><b>Имя</b>: ${claim.firstName}</p>` : ''}
                    ${claim.mobilePhone ? `<p><b>Телефон</b>: ${claim.mobilePhone}</p>` : ''}
                    ${claim.note ? `<p><b>Пожелания</b>: ${claim.note}</p>` : ''}
                    Дата: ${claim.dateCreated}
                </div>
            `
        });

        return message.then(value => value);
    }
}
