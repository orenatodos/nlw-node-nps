import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// createConnection().then(() => console.log('🔥 Connecting sucess database'));

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? './src/database/db.test.sqlite'
          : defaultOptions.database,
    }),
  );
};
