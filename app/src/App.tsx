import { ToastContainer } from "react-toastify";

import BaseComponent from "./components/BaseComponent.tsx";

const App = () => {
  return (
    <div className="App">
      <BaseComponent />
      <ToastContainer />
    </div>
  );
};

export default App;
