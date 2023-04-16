declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NODE_ENV: 'development' | 'production';
         PORT?: integer;
         JWT_SECRET_KEY: string;

         HOST_SEQ: string;
         PORT_SEQ: integer;
         DIALECT_SEQ: string;
         DATABASE_SEQ: string;
         USER_SEQ: string;
         PASSWORD_SEQ: string;

         DEV_HOST_SEQ: string;
         DEV_PORT_SEQ: integer;
         DEV_DIALECT_SEQ: string;
         DEV_DATABASE_SEQ: string;
         DEV_USER_SEQ: string;
         DEV_PASSWORD_SEQ: string;

      }
   }
}

export { }