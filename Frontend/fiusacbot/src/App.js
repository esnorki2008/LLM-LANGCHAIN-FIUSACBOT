import React, { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Spinner from './Components/Spinner/Spinner';

// Pages
const Chat = React.lazy(() => import('./Components/Chat/MainChat'));
const General = React.lazy(() => import('./Components/Start/Start'));

function App() {
  return (
    <HashRouter>
      {/****************************Spinner Load******************************************** */}
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/*******************Chat Route and components************************************ */}
          <Route exact path="/Chat/*" name="Chat" element={<Chat />} />
          {/*******************General Information and components*************************** */}
          <Route exact path="/" name="General" element={<General />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
