import { Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import * as aws from 'aws-sdk';
import { exception } from 'console';

@Injectable()
export class SendMobileNotificationService {
    private sns;

    constructor() {
        aws.config.update({region: process.env.AWS_REGION || 'eu-west-2'});
        this.sns = new aws.SNS({apiVersion: '2010-03-31'});
        // this.setSMSTypeInSNS();
    }


    async setSMSTypeInSNS() { 
        const params = {
            attributes: {
              'DefaultSMSType': 'Transactional'
            }
        };
        try {
            await this.sns.setSMSAttributes(params).promise();
        } catch (error) {
            console.error(error);
            throw error;
        }
        console.log(`successfully transactional param set :)`);
    }

    async sendSMSToMobile(number, message) {
        const params = {
            Message: message,
            PhoneNumber: number,
        };

        try {
            await this.sns.publish(params).promise();
        } catch (error) {
            console.error(error);
        }
        console.log(`successfully publist message :)`);
        return true;
    }
}
