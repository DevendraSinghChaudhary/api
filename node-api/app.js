var client = require('@mailchimp/mailchimp_marketing');

client.setConfig({
  apiKey: "60f6d7cceda966ed57d15ec0c251707b-us17",
  server: "us17",
});

const run = async () => {
  const response = await client.lists.addListMember("ede0d60f63", {
    email_address: "testing2@gmail.com",
    full_name: "testingmail s",
    status: "subscribed",
    merge_fields: {
        "FNAME": "testingA2",
        "LNAME": "lasttesting2",
        "MMERGE3": "Kajabi"
        },

  });
  console.log(response);
};

run();
