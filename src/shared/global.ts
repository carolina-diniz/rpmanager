import 'dotenv/config';

interface SHARED {
  DS_TOKEN: string;
}
export const SHARED: SHARED = {
  DS_TOKEN: process.env.DISCORD_TOKEN ?? '',
}