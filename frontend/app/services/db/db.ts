import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('tasks.db');

export default db;