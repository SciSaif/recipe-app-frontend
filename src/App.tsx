import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Recipe from "./pages/Recipe";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AddRecipe from "./pages/AddRecipe";
import { Toaster } from "@/components/ui/toaster";
function App() {
    return (
        <main className="">
            <ApolloProvider client={client}>
                <Router>
                    <div>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/recipes/:id" element={<Recipe />} />
                            <Route path="/add-recipe" element={<AddRecipe />} />
                        </Routes>
                        <Footer />
                        <Toaster />
                    </div>
                </Router>
            </ApolloProvider>
        </main>
    );
}

export default App;
