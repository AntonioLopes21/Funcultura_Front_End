import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from "../pages/HomePage/Home"
import PFFormsPage from "../pages/PFFormsPage/PFFormsPage"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/formsPessoaFisica" element={<PFFormsPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router