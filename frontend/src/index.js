import ReactDOM from 'react-dom/client';
import './index.css';
import init from './init.jsx';
import { socket } from './Socket/socket';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init(socket));
};
app();
