// src/lib/ky.ts
import ky from 'ky';

const kyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/',
  timeout: 30000, // Augmentez le timeout à 30 secondes
  hooks: {
    beforeError: [
      error => {
        console.error('API Error:', error);
        return error;
      }
    ]
  }
});

export default kyInstance;