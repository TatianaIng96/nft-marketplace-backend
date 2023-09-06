import { CreatedUser } from "../api/user/user.types";
import { Transaction } from "../api/transaction/transaction.types";
import { getSingleUser } from "../api/user/user.service";
import { getNftById } from "../api/nft/nft.service";

export const welcomeEmail = (user: CreatedUser) => {
    const emailData = {
        from: 'No reply <nft.marketplace.mir@gmail.com>',
        to: user.email,
        subject: 'Welcome to Nuron!',
        templateId: 'd-76345ae56436460da1b8f4ba59881365',
        dynamic_template_data: {
            firstName: user.firstName,
            redirectUrl: `${process.env.FRONTEND_URL}/activate-account/${user.validateToken}`
        }
    }

    return emailData;
}

export const transactionEmail = async (transaction: Transaction) => {
    const user = await getSingleUser(transaction?.buyerId)
    const nft = await getNftById(transaction?.nftId)
    const emailData = {
        from: 'No reply <nft.marketplace.mir@gmail.com>',
        to: user?.email,
        subject: 'proof of payment!',
        templateId: 'd-9b3a7459ad4b4d13a8bcdb40301c3e85',
        dynamic_template_data: {
            nftName: nft?.name,
            nftAmount: transaction.amount,
            purchaseDate: transaction.createdAt,
            redirectUrl: `${process.env.FRONTEND_URL}/`
        }
    }

    return emailData;
}
// transaction email templateId: d-9b3a7459ad4b4d13a8bcdb40301c3e85