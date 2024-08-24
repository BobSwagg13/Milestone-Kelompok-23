'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './dashboard.module.css';

// Define Task interface
interface Task {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  reward?: string;
  image?: string;
}

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState<string>('TaskHunter');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<{
    name: string;
    latitude: string;
    longitude: string;
    description: string;
    reward: string;
  }>({
    name: '',
    latitude: '',
    longitude: '',
    description: '',
    reward: ''
  });

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUsername(session.user.name || 'Task Hunter');
    }
  }, [status, session]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/places');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData = {
      ...newTask,
      latitude: parseFloat(newTask.latitude),
      longitude: parseFloat(newTask.longitude)
    };
    try {
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setTasks([...tasks, result.place]);
      setNewTask({ name: '', latitude: '', longitude: '', description: '', reward: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const markAsDone = async (id: string) => {
    try {
      const response = await fetch(`/api/places/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }

      const result = await response.json();
      console.log(result.message);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="TaskHunt Logo" width={50} height={50} />
          <h1>TaskHunt</h1>
        </div>
        <nav className={styles.navbar}>
          <a href="/">Map</a>
          <a href="/about">About Us</a>
          <button onClick={() => setIsModalOpen(true)} className={styles.addTaskButton}>Add Task</button>
          <a href="/auth/signin">Sign Out</a>
        </nav>
      </header>

      <section className={styles.welcomeSection}>
        <h2>Welcome, {username}</h2>
      </section>

      <section className={styles.tasksSection}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className={styles.taskCard}>
              <Image src={task.image || '/gacor.jpg'} alt={task.name} width={300} height={200} />
              <div className={styles.taskInfo}>
                <h3 className={styles.taskTitle}>{task.name}</h3>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Reward:</strong> {task.reward}</p>
                <p><strong>Latitude:</strong> {task.latitude}</p>
                <p><strong>Longitude:</strong> {task.longitude}</p>
                <button onClick={() => markAsDone(task._id)} className={styles.doneButton}>Mark as Done</button>
              </div>
            </div>
          ))
        ) : (
          <div>No tasks available</div>
        )}
      </section>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newTask.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="latitude">Latitude:</label>
                <input
                  type="number"
                  id="latitude"
                  name="latitude"
                  value={newTask.latitude}
                  onChange={handleChange}
                  step="any"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="longitude">Longitude:</label>
                <input
                  type="number"
                  id="longitude"
                  name="longitude"
                  value={newTask.longitude}
                  onChange={handleChange}
                  step="any"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="reward">Reward:</label>
                <input
                  type="text"
                  id="reward"
                  name="reward"
                  value={newTask.reward}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>Add Task</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelButton}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
