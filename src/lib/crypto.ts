// src/lib/crypto.ts
import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
// You must add this to your .env file later!
// It must be exactly 32 chars long
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || ''; 

export function encryptKey(text: string) {
  if (!ENCRYPTION_KEY) throw new Error("Server Encryption Key missing");
  
  // Create a random initialization vector
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return { 
    encryptedData: encrypted.toString('hex'), 
    iv: iv.toString('hex') 
  };
}

export function decryptKey(encryptedData: string, ivString: string) {
  if (!ENCRYPTION_KEY) throw new Error("Server Encryption Key missing");

  const iv = Buffer.from(ivString, 'hex');
  const encryptedText = Buffer.from(encryptedData, 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString();
}