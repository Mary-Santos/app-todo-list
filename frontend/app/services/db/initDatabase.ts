import { useEffect } from 'react';
import db from './db';

export function useInitDatabase() {
  useEffect(() => {
    async function createTable() {
      try {
        await db.withTransactionAsync(async () => {
          await db.runAsync(`
            CREATE TABLE IF NOT EXISTS tasks (
              id TEXT PRIMARY KEY NOT NULL,
              title TEXT NOT NULL,
              description TEXT,
              status TEXT NOT NULL,
              createdAt TEXT NOT NULL,
              updatedAt TEXT NOT NULL,
              syncStatus TEXT NOT NULL
            );
          `);
        });
        console.log('Tabela "tasks" criada com sucesso.');
      } catch (error) {
        console.log('Erro ao criar tabela:', error);
      }
    }

    createTable();
  }, []);
}
