import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import db from '../services/db/db';
import { useInitDatabase } from '../services/db/initDatabase';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types/Task';

export default function Home() {
  const { tasks, setTasks } = useTaskStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useInitDatabase();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const rows = await db.getAllAsync<Task>('SELECT * FROM tasks');
      setTasks(rows);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };


  const confirmDelete = (id: string) => {
    setSelectedTaskId(id);
    setModalVisible(true);
  };

  const deleteTask = async () => {
    if (!selectedTaskId) return;

    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM tasks WHERE id = ?', [selectedTaskId]);
      });

      fetchTasks();
      setModalVisible(false);
      setSelectedTaskId(null);
    } catch (err) {
      console.log('Erro ao excluir tarefa:', err);
    }
  };



  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDesc}>{item.description}</Text>
      <Text style={styles.taskStatus}>
        Status: {item.status === 'pendente' ? '⏳ Pendente' : '✅ Concluída'}
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => router.push({
            pathname: '/editTask',
            params: {
              task: JSON.stringify({
                ...item,
                description: item.description ?? '',
                status: item.status,
              }),
            },
          })}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => confirmDelete(item.id)}
        >
          <Text style={styles.btnText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Tarefas</Text>
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Botão Flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/createTask')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      {/* Modal de Confirmação */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={{ fontSize: 16, marginBottom: 16 }}>
              Tem certeza que deseja excluir esta tarefa?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#555' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteTask}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  taskStatus: {
    fontSize: 12,
    marginTop: 8,
    color: '#444',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  editBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#238E52',
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    width: '80%',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
});
