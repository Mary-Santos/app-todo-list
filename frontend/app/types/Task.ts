export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'pendente' | 'concluida';
  createdAt: string;
  updatedAt: string;
  syncStatus: 'synced' | 'created' | 'updated' | 'deleted';
};