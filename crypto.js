const crypto = require('crypto');
const fs = require('fs');

const secret = '516129';
const hash = crypto.createHmac('sha256', secret)
                   .update('xinxinshen')
                   .digest('hex');
console.log(hash);

const cert = crypto.Certificate();
console.log(cert);

const cipher = crypto.createCipher('aes192', 'a password');

let encrypted = '';
cipher.on('readable', () => {
  const data = cipher.read();
  if (data)
    encrypted += data.toString('hex');
});
cipher.on('end', () => {
  console.log(encrypted);
  // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
});

cipher.write('some clear text data');
cipher.end();

const cipher1 = crypto.createCipher('aes192', '12345');

const input = fs.createReadStream('test.js');
const output = fs.createWriteStream('test.enc');

input.pipe(cipher1).pipe(output);