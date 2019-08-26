import React, { useState, useEffect } from 'react';
import Axios from 'axios';


import './App.css';
import { Header } from './components/Header/Header';
import { LocalStorageDataProvider} from './contexts/LocalStorageDataProvider';
import { GroupList } from './components/GroupList/GroupList';
import { Modal } from './components/Modal/Modal';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    document.title = 'Todos App';
    Axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setData(res.data)
      });
  }, [])

  return (
    <div className="App">
      <LocalStorageDataProvider>
          <Header title="Todos With Hooks"/>
          <GroupList />
          <Modal />
      </LocalStorageDataProvider>

      
    </div>
  );
}

export default App;
