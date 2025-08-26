import {IsBoolean, IsString} from "class-validator";

export class ClaimDto {
    @IsString()
    firstName: string;
    @IsString()
    mobilePhone: string;
    @IsString()
    note: string;
    @IsString()
    dateCreated: string;
    @IsBoolean()
    callDesign: boolean;
    @IsBoolean()
    discussProject: boolean;

    constructor(data) {
        this.firstName = data.firstName;
        this.mobilePhone = data.mobilePhone;
        this.note = data.note;
        this.dateCreated = data.dateCreated;
        this.callDesign = data.callDesign;
        this.discussProject = data.discussProject;
    }
}