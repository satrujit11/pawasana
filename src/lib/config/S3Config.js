import { S3Client } from '@aws-sdk/client-s3';
import { SECRET_API_KEY } from '$env/static/private';

export const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIA5ES2XKEYOH7K3LUY',
    secretAccessKey: SECRET_API_KEY,
  },
});
