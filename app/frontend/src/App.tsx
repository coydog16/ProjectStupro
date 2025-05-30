// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import './css/styles/App.css';
import FeedPage from './features/feed/pages/FeedPage';
import { Theme } from './components/common/Theme';

function App() {
    return (
        <Theme>
            <Router>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                    <Route path="/feed/:username" element={<FeedPage />} />
                </Routes>
            </Router>
        </Theme>
    );
}

export default App;
