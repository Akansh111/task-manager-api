const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to: 'akansh111@gmail.com',
//     from: 'andrew@mead.io',
//     subject: 'Test email',
//     text: 'Test email'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'akansh111@gmail.com',
        subject: 'Welcome to the app',
        text: `Welcome to the app, ${name}`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'akansh111@gmail.com',
        subject: 'Thanks for having us',
        text: `Good Bye! ${name}`
    }) 
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}