import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/Home";
import NewProductPage from "./pages/NewProudct";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-product" element={<NewProductPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;