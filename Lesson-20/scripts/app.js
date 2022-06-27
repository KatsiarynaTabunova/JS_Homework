import {parseCurrentURL} from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import AddAndList from './views/pages/tasks/add-list.js';
import Info from './views/pages/tasks/info.js';
import Edit from './views/pages/tasks/edit.js';

import About from './views/pages/about.js';
import Error404 from './views/pages/error404.js';

const Routes = {
    '/': About,
    '/tasks': AddAndList,
    '/task/:id': Info,
    '/task/:id/edit': Edit
};

const router = async () => {
    const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        header = new Header();

    const urlParts = parseCurrentURL(),
        pagePath = `/${urlParts.page || ''}${urlParts.id ? '/:id' : ''}${urlParts.action ? `/${urlParts.action}` : ''}`,
        page = Routes[pagePath] ? new Routes[pagePath]() : new Error404();

    headerContainer.innerHTML = await header.render();
    contentContainer.innerHTML = await page.render();
    await page.afterRender();
};

(async () => {
    const footerContainer = document.getElementsByClassName('footer-container')[0],
        footer = new Footer();

    footerContainer.innerHTML = await footer.render();
})();

window.onload = router;
window.onhashchange = router;