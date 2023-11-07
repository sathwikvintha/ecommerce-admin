"use server";

import Plunk from "@plunk/node";

const plunk = new Plunk(process.env.PLUNK_API_KEY);
export const sendEmail = async (name,email) => {
  const response = await plunk.emails.send({
    to: email,
    subject: "Your SNX Order Has Been Accepted",
    body: `<div style="font-size: 18px;">
    Hello ${name},
    <hr style="width: 0px;">
    We hope you're well. Your recent product with SNX is currently pending and is expected to be processed within the next 3-5 business days. We appreciate your patience.
Rest assured.
If you have any questions, our customer support team is here to assist you. Thank you for shopping with SNX.

    <hr style="width: 0px;">
    Warm Regards,
    <hr style="width: 0px;">
    SNX Team
    
    </div>`,

  });

  console.log(response)
};