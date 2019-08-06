import React, { useEffect } from 'react';

import './App.css';
import { Header } from './components/Header/Header';
import { LocalStorageDataProvider} from './contexts/LocalStorageDataProvider';
import { GroupList } from './components/GroupList/GroupList';
import { Modal } from './components/Modal/Modal';

function App() {

  useEffect(() => {
    document.title = 'Todo App';
  })

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
