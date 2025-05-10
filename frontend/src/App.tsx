import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./components/Home.tsx"
import AddDiscoveryForm from "./components/AddDiscoveryForm.tsx";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/new" element={<AddDiscoveryForm/>}/>
              <Route path="/edit/:id" element={<AddDiscoveryForm/>}/>
              {/*<Route path="/about" element={<About/>}/>*/}
          </Routes>
      </Router>


      // <div>
      //   <Home/>
      // </div>
  );
};

export default App;