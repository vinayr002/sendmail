// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Use the email service provider you prefe
  auth: {
    user: "nobrokerlistings@gmail.com", // Replace with your email
    pass: "icakcelbpjbucvjk", // Replace with your email password or app-specific password
  },
});

// Define the endpoint to handle form submissions
app.post("/send-email", (req, res) => {
  const { name1, email1, phone1, url_12 } = req.body;

  const mailOptions = {
    from: "nobrokerlistings@gmail.com",
    to: email1, // Send to the email provided in the form~j
    subject: "Thank you for requesting the report!",
    html: `Hi ${name1},<br>Thank you for requesting the report.<br>Here is your link: <a href="${url_12}">Download Report</a>`,
  };

  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email");
    }

    res.status(200).send("Email sent successfully");
  });
});

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Email Service");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
