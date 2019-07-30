import Vue from 'vue';
import Vuex from 'vuex';
import uuidv4 from 'uuid/v4';
import localStorage from 'local-storage';

import actionTypes from './action-types';
import mutationTypes from './mutation-types';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tasks: {
            todo: [],
            completed: [],
        },
    },
    getters: {
        todoTasksCount: state => state.tasks.todo.length,
        completedTasksCount: state => state.tasks.completed.length,
    },
    mutations: {
        [mutationTypes.DELETE_TASK_FROM_LIST](state, { taskId }) {

            if (state.tasks.todo.find(task => (task.id === taskId))) {
                state.tasks.todo = state.tasks.todo.filter(task => (task.id !== taskId));
                localStorage.set('todo-tasks', JSON.stringify(state.tasks.todo));
            }
            if (state.tasks.completed.find(task => (task.id === taskId))) {
                state.tasks.completed = state.tasks.completed.filter(task => (task.id !== taskId));
                localStorage.set('completed-tasks', JSON.stringify(state.tasks.completed));
            }
        },
        [mutationTypes.MARK_TASK_TO_COMPLETED](state, { taskId }) {
            const targetTask = state.tasks.todo.find(task => (task.id === taskId));
            targetTask.isCompleted = true;
            state.tasks.todo = state.tasks.todo.filter(task => (task.id !== taskId));
            state.tasks.completed.unshift(targetTask);
            localStorage.set('todo-tasks', JSON.stringify(state.tasks.todo));
            localStorage.set('completed-tasks', JSON.stringify(state.tasks.completed));
        },
        [mutationTypes.UNDO_COMPLETED_TASK](state, { taskId }) {
            const targetTask = state.tasks.completed.find(task => (task.id === taskId));
            targetTask.isCompleted = false;
            state.tasks.completed = state.tasks.completed.filter(task => (task.id !== taskId));
            state.tasks.todo.unshift(targetTask);
        },
        [mutationTypes.ADD_NEW_TASK_TO_LIST](state, { taskContent }) {
            const newTask = {
                id: uuidv4(),
                content: taskContent,
                isCompleted: false,
            };
            console.log('New task created', newTask);
            state.tasks.todo.unshift(newTask);
            localStorage.set('todo-tasks', JSON.stringify(state.tasks.todo));
        },
        [mutationTypes.UPDATE_TASK_LIST](state, { taskListKey, taskList }) {
            state.tasks[taskListKey] = taskList;
        },
    },
    actions: {
        [actionTypes.DELETE_TASK]({ commit }, { taskId }) {
            commit(mutationTypes.DELETE_TASK_FROM_LIST, { taskId });
        },
        [actionTypes.TOGGLE_TASK_IS_COMPLETED]({ commit }, { taskId, isCompleted }) {
            const tagetMutationType = isCompleted ? mutationTypes.UNDO_COMPLETED_TASK :
                mutationTypes.MARK_TASK_TO_COMPLETED;
            commit(tagetMutationType, { taskId });
        },
        [actionTypes.ADD_NEW_TASK]({ commit }, { taskContent }) {
            commit(mutationTypes.ADD_NEW_TASK_TO_LIST, { taskContent });
        },
        [actionTypes.LOAD_TASKS_FROM_LOCAL_STORAGE]({ commit }) {
            const todoTasksJson = localStorage.get('todo-tasks');
            const todoList = JSON.parse(todoTasksJson) || [];
            const completedTasksJson = localStorage.get('completed-tasks');
            const completedTasks = JSON.parse(completedTasksJson) || [];
            commit(mutationTypes.UPDATE_TASK_LIST, {
                taskListKey: 'todo',
                taskList: todoList,
            });
            commit(mutationTypes.UPDATE_TASK_LIST, {
                taskListKey: 'completed',
                taskList: completedTasks,
            });
        },
    },
});

export default store