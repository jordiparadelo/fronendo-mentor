import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { Layout } from "./components";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Layout>
		<App />
	</Layout>
);
