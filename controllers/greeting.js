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
    _trySendMail(req, res, true, true);
    /*
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
    */
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
        fs.readFileSync(path.join(__dirname, '../cards/love-story/mail.ejs')).toString(),
        params
    );

    const options = {
        from: `NG Cards <${config.designerEmail}>`,
        to: data.clientEmail,
        subject: 'NG Cards: Your greeting card was sent',
        html: html,
        attachments: [
            {
                filename: '1.jpg',
                path: './cards/love-story/images/1.jpg',
                cid: 'mail@1.jpg'
            },
            {
                filename: '2.jpg',
                path: './cards/love-story/images/2.jpg',
                cid: 'mail@2.jpg'
            },
            {
                filename: '3.jpg',
                path: './cards/love-story/images/3.jpg',
                cid: 'mail@3.jpg'
            },
            {
                filename: '4.jpg',
                path: './cards/love-story/images/4.jpg',
                cid: 'mail@4.jpg'
            },
            {
                filename: '5.jpg',
                path: './cards/love-story/images/5.jpg',
                cid: 'mail@5.jpg'
            },
            {
                filename: '6.jpg',
                path: './cards/love-story/images/6.jpg',
                cid: 'mail@6.jpg'
            },
            {
                filename: '7.jpg',
                path: './cards/love-story/images/7.jpg',
                cid: 'mail@7.jpg'
            },
            {
                filename: '8.jpg',
                path: './cards/love-story/images/8.jpg',
                cid: 'mail@8.jpg'
            },
            {
                filename: '9.jpg',
                path: './cards/love-story/images/9.jpg',
                cid: 'mail@9.jpg'
            },
            {
                filename: '10.jpg',
                path: './cards/love-story/images/10.jpg',
                cid: 'mail@10.jpg'
            },
            {
                filename: '11.jpg',
                path: './cards/love-story/images/11.jpg',
                cid: 'mail@11.jpg'
            },
            {
                filename: '12.jpg',
                path: './cards/love-story/images/12.jpg',
                cid: 'mail@12.jpg'
            }
        ]
    };

    return options;
}

function _mailForReceiver(data) {
    const params = {};
    const html = ejs.render(
        fs.readFileSync(path.join(__dirname, '../cards/love-story/mail.ejs')).toString(),
        params
    );

    const options = {
        from: data.clientEmail,
        to: data.receiverEmail,
        subject: 'Greetings!',
        html: html,
        attachments: [
            {
                filename: '1.jpg',
                path: './cards/love-story/images/1.jpg',
                cid: 'mail@1.jpg'
            },
            {
                filename: '2.jpg',
                path: './cards/love-story/images/2.jpg',
                cid: 'mail@2.jpg'
            },
            {
                filename: '3.jpg',
                path: './cards/love-story/images/3.jpg',
                cid: 'mail@w3.jpg'
            },
            {
                filename: '4.jpg',
                path: './cards/love-story/images/4.jpg',
                cid: 'mail@4.jpg'
            },
            {
                filename: '5.jpg',
                path: './cards/love-story/images/5.jpg',
                cid: 'mail@5.jpg'
            },
            {
                filename: '6.jpg',
                path: './cards/love-story/images/6.jpg',
                cid: 'mail@6.jpg'
            },
            {
                filename: '7.jpg',
                path: './cards/love-story/images/7.jpg',
                cid: 'mail@7.jpg'
            },
            {
                filename: '8.jpg',
                path: './cards/love-story/images/8.jpg',
                cid: 'mail@8.jpg'
            },
            {
                filename: '9.jpg',
                path: './cards/love-story/images/9.jpg',
                cid: 'mail@9.jpg'
            },
            {
                filename: '10.jpg',
                path: './cards/love-story/images/10.jpg',
                cid: 'mail@10.jpg'
            },
            {
                filename: '11.jpg',
                path: './cards/love-story/images/11.jpg',
                cid: 'mail@11.jpg'
            },
            {
                filename: '12.jpg',
                path: './cards/love-story/images/12.jpg',
                cid: 'mail@12.jpg'
            }
        ]
    };

    return options;
}

module.exports = router;
