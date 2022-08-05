import React from 'react';
import Header from './components/Header/Header';
import Tickets from './components/Tickets/Tickets';
import TicketsForm from './components/Form/TicketsForm';
import TicketStore from './stores/TicketStore'
import { Provider } from 'mobx-react';
import styles from './App.module.scss'

import { StoresNames } from './dictionary';


function App() {
  const ticketStore = new TicketStore();
  
  const stores = {
    [StoresNames.TicketStore]: ticketStore,
  };
  return (
    <Provider  {...stores}>
      <div className={styles.App}>
        <Header />
        <div className={styles.container}>
          <TicketsForm />
          <Tickets />
        </div>
      </div>
    </Provider>
  );
}

export default App;
