import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendRegistrationTokenEmail = (email, firstName, token) => {
  const msg = {
    to: email, // Change to your recipient
    from: 'marvinsjsu@gmail.com', // Change to your verified sender
    subject: 'Moment registration code',
    text: 'Welcome to Moment',
    html: `<strong>Hi ${firstName}</strong>,
      <br/>
      <br/>
      Welcome to Moment. To continue creating your account,
      <br/>
      please enter code: <strong>${token}</strong>.
      <br/>
      <br/>
      Cheers,
      <br/>
      Moment Team
      <br/>
    `,
  };

  return sgMail.send(msg);
};


export {
  sendRegistrationTokenEmail,
  sgMail,
};
