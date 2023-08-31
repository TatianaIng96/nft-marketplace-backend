import { CreatedUser } from "../api/user/user.types";

export const welcomeEmail = (user: CreatedUser) => {
    const emailData = {
        from: 'No reply <nft.marketplace.mir@gmail.com>',
        to: user.email,
        subject: 'Welcome to Nuron!',
        templateId: 'd-76345ae56436460da1b8f4ba59881365',
        dynamic_template_data: {
            firstName: user.firstName,
            redirectUrl: 'http://localhost:5173/'
        }
    }

    return emailData;
}