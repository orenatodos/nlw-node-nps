import nodemailer from 'nodemailer';

import handlebars from 'handlebars';
import fs from 'fs';

interface Request {
  pathFile: string;
  variables: object;
  to: string;
  subject: string;
}

export default class SendMailsService {
  async execute({ pathFile, variables, to, subject }: Request): Promise<void> {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const templateFileContent = fs.readFileSync(pathFile).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    const message = await transporter.sendMail({
      from: 'NPS <noreplay@nps.com.br>',
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
