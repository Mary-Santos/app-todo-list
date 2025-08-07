import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import db from '../services/db/db';
import { useInitDatabase } from '../services/db/initDatabase';
import { Task } from '../types/Task';

export function EditTaskScreen() {
    const { params } = useRoute<any>();
    const navigation = useNavigation();
    const task: Task = params.task;

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    useInitDatabase();

    const update = async () => {
        const updatedAt = new Date().toISOString();

        try {
            await db.withTransactionAsync(async () => {
                await db.runAsync(
                    `UPDATE tasks SET title = ?, description = ?, updatedAt = ?, syncStatus = 'updated' WHERE id = ?`,
                    [title, description ?? '', updatedAt, task.id]
                );
            });

            navigation.goBack();
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
    };

    const remove = () => {
        Alert.alert("Confirmar", "Excluir esta tarefa?", [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => {
                    try {
                        await db.withTransactionAsync(async () => {
                            await db.runAsync(
                                `UPDATE tasks SET syncStatus = 'deleted' WHERE id = ?`,
                                [task.id]
                            );
                        });

                        navigation.goBack();
                    } catch (error) {
                        console.error('Erro ao marcar tarefa como deletada:', error);
                    }
                }
            }
        ]);
    };

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={{ marginBottom: 8, borderBottomWidth: 1 }}
                placeholder="Título"
            />
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={{ marginBottom: 8, borderBottomWidth: 1 }}
                placeholder="Descrição"
            />
            <Button title="Atualizar" onPress={update} />
            <View style={{ marginTop: 16 }}>
                <Button title="Excluir" onPress={remove} color="#c00" />
            </View>
        </View>
    );
}
