const MailContent = {
  SUBJECT: 'Credentials for signing in to TowHub app',
  GREETING: 'Hello,',
  CREDENTIALS: 'Your credentials for our app are as follows:',
  USERNAME: 'Email:',
  PASSWORD: 'Password:',
  SIGNIN_LINK: 'To sign in, please click the following link:',
  CLOSING: 'Thank you for using our app!',
  LINK: '<a href="http://localhost:3000/sign-in">Sign In</a>',
} as const;

export { MailContent };
