import  { useEffect, useState,  } from 'react';
import useHttp from './hooks/use-http';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  
  // will recive data from use http hook
  

  const httpData = useHttp();

const {isLoading, error , sendRequest: fetchTasks} = httpData;

  

  useEffect(() => {
    const transformTasks = ((tasksObj)=>{
   
      const loadedTasks = [];
  
      for (const tasksKey in tasksObj) {
        loadedTasks.push({ id: tasksKey, text: tasksObj[tasksKey].text });
      }
  
      setTasks(loadedTasks);
    })

    fetchTasks({
      url:'https://react-b6104-default-rtdb.firebaseio.com/tasks.json'},transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}

export default App;
