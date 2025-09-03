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

    async sendMail(claim: ClaimDto) {
        return await this.mailService.sendMail({
            from: `${this.configService.get('SMTP_USER')}`,
            to: `${this.configService.get('SMTP_USER')}`,
            subject: 'Новая заявка с сайта "Технологии комфорта"',
            html: `
                <div>
                    <h1>Новая заявка!</h1>
                    ${claim.firstName ? `<p><b>Имя</b>: ${claim.firstName}</p>` : ''}
                    ${claim.mobilePhone ? `<p><b>Телефон</b>: ${claim.mobilePhone}</p>` : ''}
                    ${claim.note ? `<p><b>Пожелания</b>: ${claim.note}</p>` : ''}
                    <p><b>Тип заявки:</b> ${claim.discussProject || claim.callDesign ? claim.callDesign ? 'Вызов дизайнера ' : 'Обсудить проект' : '-'}</p>
                    <p><b>Дата:</b> ${claim.date.getDay().toString().padStart(2, '0')}.${(claim.date.getMonth() + 1).toString().padStart(2, '0')}.${claim.date.getFullYear()}</p>
                </div>
            `
        });
    }
}
