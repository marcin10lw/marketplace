import express from 'express';
import { getPayloadClient } from './getPayload';

const app = express();

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    const payload = await getPayloadClient();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {}
};

start();
