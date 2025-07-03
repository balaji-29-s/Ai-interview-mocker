/** @type {import('drizzle-kit').Config} */
export default {
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_D6YbOqLXao0e@ep-plain-scene-a8qkugpj-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
};
