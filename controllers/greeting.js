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
    if (!req.files) {
        return res.status(400).send('No files were uploaded');
    }

    let isMailUploaded = false;
    let isImageUploaded = false;

    req.files.cardMail.mv(path.join(__dirname, '../cards/mail.ejs'), (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        isMailUploaded = true;
        _trySendMail(req, res, isMailUploaded, isImageUploaded);
    });

    req.files.cardMail.mv(path.join(__dirname, '../cards/image.jpg'), (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        isImageUploaded = true;
        _trySendMail(req, res, isMailUploaded, isImageUploaded);
    });
});

function _trySendMail(req, res, isMailUploaded, isImageUploaded) {
    if (isMailUploaded && isImageUploaded) {
        const data = req.body;

        let transporter = nodeMailer.createTransport(
            {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: config.serverAuth
            }
        );

        transporter.sendMail(_mailForClient(data), (error) => {
            if (error) {
                console.log(error.message);
                return res.status(500).send('Error!');
            }
        });

        transporter.sendMail(_mailForReceiver(data), (error) => {
            if (error) {
                console.log(error.message);
                return res.status(500).send('Error!');
            }

            res.redirect('/greeted');
        });
    }
}

function _mailForClient(data) {
    const params = {};
    const html = ejs.render(
        fs.readFileSync(path.join(__dirname, '../cards/mail.ejs')).toString(),
        params
    );

    const options = {
        from: `NG Cards <${config.designerEmail}>`,
        to: data.clientEmail,
        subject: 'NG Cards: Your greeting card was sent',
        html: html,
        attachments: [
            {
                filename: 'image.jpg',
                path: './cards/image.jpg',
                cid: 'mail@image.jpg'
            }
        ]
    };

    return options;
}

function _mailForReceiver(data) {
    const params = {};
    const html = ejs.render(
        fs.readFileSync(path.join(__dirname, '../cards/mail.ejs')).toString(),
        params
    );

    const options = {
        from: data.clientEmail,
        to: receiverEmail,
        subject: 'Greetings!',
        html: html,
        attachments: [
            {
                filename: 'image.jpg',
                path: './cards/image.jpg',
                cid: 'mail@image.jpg'
            }
        ]
    };

    return options;
}

module.exports = router;
