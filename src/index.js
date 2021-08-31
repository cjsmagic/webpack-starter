import { add } from './utils/calculator';
import "./style.css";


window.onload = function () {
    document.getElementById('content').innerText = `Hello Webpack ${add(10, 20)}`;
}