import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import LoadingIndicator from "./config/LoadingIndicator";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <LoadingIndicator />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
