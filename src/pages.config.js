import About from './pages/About';
import DevSandbox from './pages/DevSandbox';
import GamePlay from './pages/GamePlay';
import Garden from './pages/Garden';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Roadmap from './pages/Roadmap';
import VeraWangGame from './pages/VeraWangGame';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "DevSandbox": DevSandbox,
    "GamePlay": GamePlay,
    "Garden": Garden,
    "Home": Home,
    "Privacy": Privacy,
    "Roadmap": Roadmap,
    "VeraWangGame": VeraWangGame,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
