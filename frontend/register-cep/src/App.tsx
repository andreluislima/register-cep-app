import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainRoutes from "./router";
 
function App() {
  return (
    <>
      <div className="container-fluid container-app">
        <Header/>
        <MainRoutes/>
        <Footer/>
      </div>
      
    </>
  );
}

export default App;
