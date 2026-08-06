import { App } from './app/App';
import './app/styles/tokens.css';
import './app/styles/global.css';
import './app/styles/components.css';
import './app/styles/responsive.css';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Elemento #app não encontrado.');

new App(root).start();
