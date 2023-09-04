import sgMail from '@sendgrid/mail';

export const sendMailWithSendgrid = (data: sgMail.MailDataRequired) => {
    const apiKey = process.env.SENDGRID_API_KEY as string;
    sgMail.setApiKey(apiKey);

    return sgMail.send(data);
}