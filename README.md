# Authentication Portal
### About
It is a Complete Authentication Portal with Email verification, Image Upload, Forgot and Reset Password using MERN Stack.

### Key inclusions:
- Authentication using JWT.
- All passwords are stored after encrypting.
- Email verification is must to activate the account.
- User can upload image during signup
- User can Reset Password using Forgot Password
- Complete Error Handing

### Major Tech Stack:
React, Redux, Nodejs, MongoDB, Express, Nodemailer, Multer

### Preview:

**SignUp**

![Screenshot from 2021-10-18 16-22-10](https://user-images.githubusercontent.com/60233336/137717594-60e072dc-329e-426d-b518-778cca9477ec.png)
<br>

**Mail Preview**

![Screenshot from 2021-10-18 16-19-19](https://user-images.githubusercontent.com/60233336/137717215-969b541c-eea1-4a71-8bb8-9daca5d6eb9f.png)


### Installation

```
Open terminal
https://github.com/saurabhhere/Authentication-Portal.git
cd Authentication-Portal
```
For client side:
```
cd client
npm install
npm start
```
It will start client on PORT 3000
For server side:
```
cd server
npm install 
nodemon server
```
It will start server on PORT 5000 by default

Add .env file in server folder containing:
```
JWT_SECRET = your_secret_string
EMAIL = your_email_for_nodemailer
PASSWORD = your_email_password
CONNECTION_URL = your_mongodb_url
```


