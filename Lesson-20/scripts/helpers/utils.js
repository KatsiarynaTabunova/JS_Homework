export const parseCurrentURL = () => {
    const urlParts = {};

    [urlParts.page, urlParts.id, urlParts.action] = location.hash.slice(2).split('/');

    return urlParts;
};

export const generateID = () => {
    return Math.random().toString(36).substr(2, 10);
};