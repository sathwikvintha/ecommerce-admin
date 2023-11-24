"use server";

import Plunk from "@plunk/node";

const plunk = new Plunk(process.env.PLUNK_API_KEY);
export const sendCheckout = async (id,email,name,userphoneNo,url,ownerPhone) => {
    console.log(id,email,name,userphoneNo,url,ownerPhone)


    await fetch(`https://admin-dashboard-seven-bay.vercel.app/api/products/${id}`, {
      method: "PUT",
    });
  const response = await plunk.emails.send({
    to: email,
    subject: "Here is the product owner details",
    body: `<div style="font-size: 18px;">
    Hello ,
    <hr style="width: 0px;">
    We hope you doing well.Here is the product owner details
    <hr style="width: 0px;">
    Email: ${email}
    <hr style="width: 0px;">
    phone: ${ownerPhone}
    <hr style="width: 0px;">
    Warm Regards,
    <hr style="width: 0px;">
    SNX Team
    </div>`,

  });

  const respose1=await plunk.emails.send({
    to: email,
    subject: "Hey product is ordered",
    body: `<div style="font-size: 18px;">
    Hello ,
    <hr style="width: 0px;">
    We hope you doing well this is to tell the product you posted on SNX has been ordered by a user
    Here are the user details
    <hr style="width: 0px;">
    Email: ${email}
    <hr style="width: 0px;">
    phone: ${userphoneNo}
    <hr style="width: 0px;">
    Here is the payment screenshot 
    <img src=${url} alt="payment screenshot">
    <hr style="width: 0px;">
    If you haven;t received the payment please send an email to ${email}
    Warm Regards,
    <hr style="width: 0px;">
    SNX Team
    </div>`,

  });

  console.log(response)
};