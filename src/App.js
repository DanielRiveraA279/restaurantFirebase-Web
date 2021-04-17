import React from "react";
import { Route, Switch } from "react-router-dom";

import Ordenes from "./components/paginas/Ordenes";
import Menu from "./components/paginas/Menu";
import NuevoPlatillo from "./components/paginas/Platillo";
import Sidebar from "./components/ui/Sidebar";

//una vez creado y trabajado en la carpeta firebase
import firebase, { FirebaseContext } from "./firebase/index";

function App() {
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
      }}
    >
      <div className="md:flex min-h-screen">
        <Sidebar />

        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Switch>
            <Route exact path="/">
              <Ordenes />
            </Route>
            <Route exact path="/menu">
              <Menu />
            </Route>
            <Route exact path="/nuevo-platillo">
              <NuevoPlatillo />
            </Route>
          </Switch>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
