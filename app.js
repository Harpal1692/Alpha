const express = require("express");
const Send = require("./sendMail");

const app = express();

app.use(express.json());

app.use("/", express.static("./public"));

app.get("/", (req, res) => {
  return res.status(200).sendFile(__dirname + "/public/index.html");
});

app.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;
    const mailOption = {
      from: "harpalpatel320@gmail.com",
      to: "harpalpatel320@gmail.com",
      subject: "New Inquiry Mail",
      html: `
            <p>Dear Harpal <br/>new Inquiry Here in your betting App <br/></p>
            <p>
                <hr/>
                <strong style='font-size:17px;'>Customer Name: </strong> <small style='font-size:14px;'>${name}</small><br/>
                <strong style='font-size:17px;'>Customer Phone: </strong> <small style='font-size:14px;'>${phone}</small>
            </p>  
                   `,
    };
    const result = await Send(mailOption);
    if (!result)
      return res.status(500).send({ message: "Somthing went wrong" });
    if (!result.includes("OK"))
      return res.status(500).send({ message: "Somthing went wrong" });
    return res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.listen(8000, () => {
  console.log("server started");
});
