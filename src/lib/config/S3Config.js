import { S3Client } from '@aws-sdk/client-s3';
import { SECRET_API_KEY } from '$env/static/private';

export const s3Client = new S3Client({
  endpoint: 'https://blr1.digitaloceanspaces.com',
  forcePathStyle: false,
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'DO00XA8H8EHHYKX742DQ',
    secretAccessKey: SECRET_API_KEY,
  },
});
