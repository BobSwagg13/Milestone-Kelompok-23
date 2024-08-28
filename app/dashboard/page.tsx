'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Plus,Coins} from 'lucide-react';

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
    <main className="bg-gradient-to-b from-yellow-100 to-green-300 p-4 min-h-screen">
      <h2 className=' text-4xl text-green-800 m-4'>Welcome, {username}</h2>
      <div className='flex flex-row'>
      <section className='flex'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className='bg-white rounded-2xl m-5 w-60 h-90 shadow-2xl border-2 border-custom-green' key={task._id} >
              <div className='p-5'>
              <h3 className='text-xl font-semibold my-2'>{task.name}</h3>
              <Image src={task.image || '/gacor.jpg'} alt={task.name} width={300} height={200}  className='rounded-lg ' />
              <div>
                <p><strong>Description:</strong> {task.description}</p>
                <p className='font-semibold'>Reward</p>
                <p className='flex flex-row items-center justify-center bg-light-green py-3 text-custom-green text-2xl rounded-3xl font-semibold shadow-md mb-3 app'>
                  <Coins size={30} className='mr-2' />
                  {task.reward} pts
                  </p>
                <div className='border-custom-green border-2 rounded-md p-3 mt-5'>
                <p><strong>Latitude:</strong> {task.latitude}</p>
                <p><strong>Longitude:</strong> {task.longitude}</p>
                </div>
                <button onClick={() => markAsDone(task._id)} className='mt-4 bg-light-green px-3 py-2 rounded-xl hover:shadow-md hover:scale-125 transition text-custom-green font-semibold '>Mark as Done</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No tasks available</div>
        )}
      </section>
      <button onClick={() => setIsModalOpen(true)} className='bg-transparent backdrop-blur-xl rounded-2xl m-5 w-60 h-90 shadow-2xl flex flex-col items-center justify-center'>
        <div className='bg-white shadow-2xl p-3 rounded-full app text-custom-green'>
        <Plus strokeWidth={3}/>
        </div>
        <p className='mt-3 font-semibold'>Add Task</p>
      </button>
      </div>

      {isModalOpen && (
          <div className='bg-white flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center px-4 py-9'>
            <h2 className='text-xl'>Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <div>
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
              <div>
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
              <div>
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
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
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
              <div>
                <button type="submit">Add Task</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
      )}
    </main>
    
  );
};

export default Dashboard;
