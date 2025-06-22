import {IsString} from "class-validator";

export class ClaimDto {
    @IsString()
    firstName: string;
    @IsString()
    mobilePhone: string;
    @IsString()
    note: string;
    @IsString()
    dateCreated: string;

    constructor(data) {
        this.firstName = data.firstName;
        this.mobilePhone = data.mobilePhone;
        this.note = data.note;
        this.dateCreated = data.dateCreated;
    }
}