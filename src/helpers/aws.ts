import { EnvVars } from '../global.env'
import { SES, } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import { Registry } from '../models/resgistry';

const ses = new SES({
    accessKeyId: EnvVars.aws_access_key,
    secretAccessKey: EnvVars.aws_secret_access_key,
    region: "us-west-2"
});

const ProcessEmail = (emailAddress: string): Boolean => {
    try {
        ses.sendEmail(CreateWelcomeEmail(new Registry("Andy", "Crowe", "crowemi@hotmail.com")), (err, data) => {
            if (err) {
                console.log(err, err.stack);
            }
            else {
                console.log(data);
            };
        });
        return true;
    }
    catch (err) {
        return false;
    }
}

const CreateWelcomeEmail = (registry: Registry): SendEmailRequest => {
    var WelcomeEmail: SendEmailRequest = {
        Source: "hello@twothousand4.com",
        Destination: {
            ToAddresses: [registry.email]
        },
        Message: {
            Subject: {
                Data: `Welcome, ${registry.firstName}!`
            },
            Body: {
                Text: {
                    Data: `Hey ${registry.firstName}!\n\nThanks for joining us! We've got lots going on and we'll be sure to update you we progress.\n\nFirst things first, please confirm your email using the following link:\n\n  \n\nIf you have any questions or feedback, don't hesitate to reach out to us by replying to this email.`,
                },
            }
        }
    }
    return WelcomeEmail;
}

export { ProcessEmail }
