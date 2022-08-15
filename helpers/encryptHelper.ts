import * as crypto from 'crypto';
const algorithm: string = process.env.CRYPTO_ALGORITHM;
const secretKey: string = process.env.CRYPTO_SECRET_KEY;
const iv: Buffer = crypto.randomBytes(16);


export const encrypt = (text: string): string => {
  const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted: Buffer = Buffer.concat([cipher.update(text), cipher.final()]);

  return  `${iv.toString('hex')}.${encrypted.toString('hex')}`

};

export const decrypt = (hash: string): string => {
  const decipher: crypto.Decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.split('.')[0], 'hex'));
  const decrpyted: Buffer = Buffer.concat([decipher.update(Buffer.from(hash.split('.')[1], 'hex')), decipher.final()]);

  return decrpyted.toString();
};