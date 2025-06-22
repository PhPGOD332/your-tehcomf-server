import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {ClaimDto} from "../dtos/Claim.dto";

@Injectable()
export class MailService {
    constructor(
        private readonly mailService: MailerService
    ) {}

    sendMail(claim: ClaimDto) {
        const message = this.mailService.sendMail({
            from: `${process.env.user}@yandex.ru`,
            to: `${process.env.user}@yandex.ru`,
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
