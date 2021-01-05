import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { AWSError } from 'aws-sdk';

@Injectable()
export class SendMobileNotificationService {
  private sns: aws.SNS;
  private ses: aws.SES;

  constructor() {
    aws.config.update({ region: process.env.AWS_REGION || 'us-east-1' });
    this.sns = new aws.SNS({ apiVersion: '2010-03-31' });
    this.ses = new aws.SES();

  }


  async setSMSTypeInSNS() {
    const params = {
      attributes: {
        'DefaultSMSType': 'Transactional'
      }
    };
    try {
      await this.sns.setSMSAttributes(params).promise();
      console.log(`successfully transactional param set :)`);

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async sendSMSToMobile(number: string, message: string) {
    await this.setSMSTypeInSNS();
    const params = {
      Message: message,
      PhoneNumber: number
    };

    try {
      await this.sns.publish(params).promise();
    } catch (error) {
      console.error(error);
    }
    console.log(`successfully publist message :)`);
    return true;
  }

  async sendEmail(to: Array<string>, data: string) {

    const params = {
      Destination: {
        ToAddresses: [
          ...to
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: data
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Melian App"
        }
      },
      Source: process.env.SOURCE_VERIFIED_EMAIL || 'hamzajaved2080@gmail.com'
    };
    this.ses.sendEmail(params, function (err: AWSError, data: any) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  }
}
