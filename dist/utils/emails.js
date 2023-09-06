"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeEmail = void 0;
const welcomeEmail = (user) => {
    const emailData = {
        from: 'No reply <nft.marketplace.mir@gmail.com>',
        to: user.email,
        subject: 'Welcome to Nuron!',
        templateId: 'd-76345ae56436460da1b8f4ba59881365',
        dynamic_template_data: {
            firstName: user.firstName,
            redirectUrl: `${process.env.FRONTEND_URL}/activate-account/${user.validateToken}`
        }
    };
    return emailData;
};
exports.welcomeEmail = welcomeEmail;
// transaction email templateId: d-9b3a7459ad4b4d13a8bcdb40301c3e85
