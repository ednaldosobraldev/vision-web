import ReactDOM from "react-dom/client";
import App from "./App";

import { UserProvider } from "./context/useContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <UserProvider>
      <App/>
    </UserProvider>
);
