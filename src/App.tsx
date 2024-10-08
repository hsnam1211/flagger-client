import "@/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "@/pages/NotFound";
import TestPage from "./pages/test/TestPage";
import TheFlagger from "./pages/test/TheFlagger";
import TheSpeeder from "./pages/test/TheSpeeder";

// import "@hoosss-test/utils";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<TestPage />} />
        <Route path="/flagger" element={<TheFlagger />} />
        <Route path="/speeder" element={<TheSpeeder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
