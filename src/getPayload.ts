import dotenv from 'dotenv';
import path from 'path';
import payload from 'payload';
import type { InitOptions } from 'payload/config';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

type Args = {
  initOptions?: Partial<InitOptions>;
};

export const getPayloadClient = async ({ initOptions }: Args = {}) => {
  const secret = process.env.PAYLOAD_SECRET;

  if (!secret) {
    throw new Error('PAYLOAD_SECRET env variable is missing');
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      secret,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    throw error;
  }

  return cached.client;
};
