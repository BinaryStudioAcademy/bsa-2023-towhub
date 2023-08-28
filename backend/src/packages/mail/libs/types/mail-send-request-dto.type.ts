import { type Options } from 'nodemailer/lib/mailer';

type MailSendRequestDto = Pick<
  Options,
  'to' | 'subject' | 'cc' | 'bcc' | 'text' | 'html'
>;

export { type MailSendRequestDto };
