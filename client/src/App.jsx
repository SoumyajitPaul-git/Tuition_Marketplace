// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import "./App.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-light min-h-screen font-sans">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>

    // <div className="p-10 bg-red-100 text-center text-lg text-red-700 font-bold">
    //   Tailwind is working!
    // </div>
  );
}

export default App;
