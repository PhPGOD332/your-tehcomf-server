import {IsBoolean, IsDate, IsString} from "class-validator";

export class ClaimDto {
    @IsString()
    firstName: string;
    @IsString()
    mobilePhone: string;
    @IsString()
    note: string;
    @IsDate()
    date: Date;
    @IsBoolean()
    callDesign: boolean;
    @IsBoolean()
    discussProject: boolean;

    constructor(data) {
        this.firstName = data.firstName;
        this.mobilePhone = data.mobilePhone;
        this.note = data.note;
        this.date = data.date;
        this.callDesign = data.callDesign;
        this.discussProject = data.discussProject;
    }
}