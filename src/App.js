import React, { useState, useEffect, useContext } from 'react';
import uuid from 'uuid';

import './App.css';
import { Header } from './components/Header/Header';
import { LocalStorageDataProvider} from './contexts/LocalStorageDataProvider';
import { Footer } from './components/Footer/Footer';
import { GroupList } from './components/GroupList/GroupList';

function App() {


  return (
    <div className="App">
      <LocalStorageDataProvider>
          <Header title="Todos With Hooks"/>
          <GroupList />
          <Footer />
      </LocalStorageDataProvider>
    </div>
  );
}

export default App;
