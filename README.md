Open your terminal or command prompt.
Run the following Node.js script to generate a random string:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Copy the generated string.

Open your .env file and set the JWT secret key:

JWT_SECRET=paste-the-generated-string-here


Estou comentando o código com o objetivo de reforçar meu entendimento