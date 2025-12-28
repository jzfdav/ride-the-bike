import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./index.css";

import { ShaderLab } from "./ShaderLab";

const queryClient = new QueryClient();

const isShaderLab = window.location.pathname.endsWith("/shader-lab");

ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		{isShaderLab ? <ShaderLab /> : <App />}
	</QueryClientProvider>,
);
