import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { StateProvider } from "./Context/StateProvider";
import { useEffect } from "react";
import requestPermissions from "./config/notification";
function App() {
  useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StateProvider>
            <RouterProvider router={router} />
          </StateProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
