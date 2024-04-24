"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Plunk from "@plunk/node";

const plunk = new Plunk(process.env.PLUNK_API_KEY);
export const sendCheckout = async (
  id,
  owneremail,
  name,
  userphoneNo,
  url,
  ownerPhone
) => {
  console.log(id, owneremail, name, userphoneNo, url, ownerPhone);

  const { getUser } = getKindeServerSession();
  const { email } = await getUser();

  console.log(email, "user email");
  console.log(owneremail, "user name");
  await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "PUT",
  });

  const response = await plunk.emails.send({
    to: email,
    subject: "VOILA! Your SNX Order is Confirmed.",
    body: `<div style="font-size: 18px;">
    Hello ,
    <hr style="width: 0px;">
    We are excited to inform you that your recent order with SNX is Confirmed.
    You can now contact the seller at 
    <hr style="width: 0px;">
    Email: ${owneremail}
    <hr style="width: 0px;">
    phone: ${ownerPhone}
    <hr style="width: 0px;">
    Thank you for choosing SNX.
Happy shopping!

    <hr style="width: 0px;">
    Warm Regards,
    <hr style="width: 0px;">
    SNX Team
    </div>`,
  });

  const respose1 = await plunk.emails.send({
    to: owneremail,
    subject: " Hurray! Your product has been purchased.",
    body: `<div style="font-size: 18px;">
    Hello ,
    <hr style="width: 0px;">
    We are excited to inform you that your product has been purchased.
    Here are the buyer details. 
    <hr style="width: 0px;">
    Email: ${email}
    <hr style="width: 0px;">
    phone: ${userphoneNo}
    <hr style="width: 0px;">
    Here is the payment screenshot 
    <hr style="width: 0px;">
    <img src=${url}  style="width: 200px; height:200px;" alt="payment screenshot">
    <hr style="width: 0px;">
    If you have any queries, please don't hesitate to contact our customer support team at [lr888@snu.edu.in]. 
    <hr style="width: 0px;">
    Warm Regards,
    <hr style="width: 0px;">
    Thank you for your excellent business. We look forward to work together on future transactions.
    <hr style="width: 0px;">

    SNX Team
    </div>`,
  });

  console.log(response);
};
