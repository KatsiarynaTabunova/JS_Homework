class Tasks {
    async getTasksList() {
        const response = await fetch('http://localhost:3000/api/tasks');

        return await response.json();
    }

    async addTask(newTask) {
        const response = await fetch('http://localhost:3000/api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        return await response.json();
    }

    async updateTaskStatus(taskId, newStatus) {
        const response = await fetch(`http://localhost:3000/api/task/${taskId}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: taskId, status: newStatus})
        });
    }

    async getTask(id) {
        const response = await fetch(`http://localhost:3000/api/task/${id}`);

        return await response.json();
    }

    async editTask(updatedTask) {
        await fetch(`http://localhost:3000/api/task/${updatedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
    }

    async removeTask(taskId) {
        await fetch(`http://localhost:3000/api/task/${taskId}`, {
            method: 'DELETE'
        });
    }
}

export default Tasks;