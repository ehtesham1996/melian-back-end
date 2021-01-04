import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

@Injectable()
export class SendMobileNotificationService {
  private sns;
  private ses;

  constructor() {
    aws.config.update({ region: process.env.AWS_REGION || 'us-east-1' });
    this.sns = new aws.SNS({ apiVersion: '2010-03-31' });
    this.ses = new aws.SES();

    this.setSMSTypeInSNS();
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
      Source: 'hamzajaved2080@gmail.com'
    };
    this.ses.sendEmail(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  }
}
