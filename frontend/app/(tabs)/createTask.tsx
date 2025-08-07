import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import db from '../services/db/db';
import { useInitDatabase } from '../services/db/initDatabase';
import { Task } from '../types/Task';

export default function CreateTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  useInitDatabase(); 

  const handleSave = async () => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: uuid.v4() as string,
      title,
      description,
      status: 'pendente',
      createdAt: now,
      updatedAt: now,
      syncStatus: 'created',
    };

  try {
    await db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO tasks (id, title, description, status, createdAt, updatedAt, syncStatus)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          newTask.id,
          newTask.title,
          newTask.description,
          newTask.status,
          newTask.createdAt,
          newTask.updatedAt,
          newTask.syncStatus,
        ]
      );
    });

    navigation.goBack();
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error);
  }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        placeholderTextColor="#888"
      />
      <View style={styles.buttonContainer}>
        <Button title="Salvar" onPress={handleSave} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', 
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});

