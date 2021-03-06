const express = require('express');
const router = express.Router();

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const nodeMailer = require('nodemailer');

const config = require('../config');


/**
 * POST mail data
 */
router.post('/', (req, res) => {
    const data = req.body;

    let transporter = nodeMailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: config.serverAuth
        }
    );

    transporter.sendMail(_mailForDesigner(data), (error) => {
        if (error) {
            console.log(error.message);
            return res.status(500).send('Error!');
        }
    });

    transporter.sendMail(_mailForClient(data), (error) => {
        if (error) {
            console.log(error.message);
            return res.status(500).send('Error!');
        }

        res.redirect('/ordered');
    });
});

function _mailForDesigner(data) {
    const params = {
        'client-name': data['client-name'],
        'client-email': data['client-email'],
        'receiver-name': data['receiver-name'],
        'receiver-email': data['receiver-email'],
        'subject': data['subject'],
        'description': data['description']
    };
    const html = ejs.render(
        fs.readFileSync(path.join(__dirname, '../view/mail-for-designer.ejs')).toString(),
        params
    );

    const options = {
        from: `NG Cards <${config.designerEmail}>`,
        to: config.designerEmail,
        subject: 'NG Cards: A new greeting card ordered',
        html: html,
        attachments: [
            {
                filename: 'akita.jpg',
                path: './mail-static/akita.jpg',
                cid: 'mail@akita.jpg'
            }
        ]
    };

    return options;
}

function _mailForClient(data) {
    const params = {
        name: data.name,
        sname: data.sname
    };
    const html = ejs.render(
        fs.readFileSync(path.join(__dirname, '../view/mail-for-client.ejs')).toString(),
        params
    );

    const options = {
        from: `NG Cards <${config.designerEmail}>`,
        to: data.email,
        subject: 'NG Cards: You have ordered a greeting card',
        html: html,
        attachments: [
            {
                filename: 'akita.jpg',
                path: './mail-static/akita.jpg',
                cid: 'mail@akita.jpg'
            }
        ]
    };

    return options;
}

module.exports = router;
