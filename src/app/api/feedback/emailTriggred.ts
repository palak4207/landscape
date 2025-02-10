import emailjs from "@emailjs/nodejs";

interface IEmailTriggred {
  name: string;
  comment: string;
  phone: number | string;
}

// function to trigger mail
export async function emailTriggred(data: IEmailTriggred) {
  const templateParams = {
    to_name: "Umang",
    from_name: data?.name,
    message: data?.comment,
    contact_number: data?.phone,
  };

  emailjs
    .send(
      `${process.env.EMAIL_SERVICE_ID}`,
      `${process.env.EMAIL_TEMPLATE_ID}`,
      templateParams,
      {
        publicKey: process.env.EMAIL_PUBLIC_KEY,
        privateKey: process.env.EMAIL_PRIVATE_KEY,
      }
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (err) => {
        console.log("FAILED...", err);
      }
    );
}
