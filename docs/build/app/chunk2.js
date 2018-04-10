/*! Built with http://stenciljs.com */
const { h } = window.App;

/**
 * Create the mode and color classes for the component based on the classes passed in
 */
function createThemedClasses(mode, color, classes) {
    const classObj = {};
    classes.split(' ').forEach(classString => {
        classObj[classString] = true;
        if (mode) {
            classObj[`${classString}-${mode}`] = true;
            if (color) {
                classObj[`${classString}-${color}`] = true;
                classObj[`${classString}-${mode}-${color}`] = true;
            }
        }
        return classObj;
    });
    return classObj;
}
/**
 * Get the classes from a class list and return them as an object
 */
function getElementClassMap(classList) {
    const classObj = {};
    for (let i = 0; i < classList.length; i++) {
        classObj[classList[i]] = true;
    }
    return classObj;
}
/**
 * Get the classes based on the button type
 * e.g. alert-button, action-sheet-button
 */
function getButtonClassMap(buttonType, mode) {
    if (!buttonType) {
        return {};
    }
    return {
        [buttonType]: true,
        [`${buttonType}-${mode}`]: true
    };
}
function getClassList(classes) {
    if (classes) {
        if (Array.isArray(classes)) {
            return classes;
        }
        return classes
            .split(' ')
            .filter(c => c.trim() !== '');
    }
    return [];
}
function getClassMap(classes) {
    const map = {};
    getClassList(classes).forEach(c => map[c] = true);
    return map;
}
function openURL(url, ev, goBack = false) {
    if (url && url[0] !== '#' && url.indexOf('://') === -1) {
        const router = document.querySelector('ion-router');
        if (router) {
            ev && ev.preventDefault();
            return router.componentOnReady().then(() => router.push(url, goBack ? -1 : 1));
        }
    }
    return Promise.resolve();
}

export { openURL, createThemedClasses, getElementClassMap, getButtonClassMap, getClassMap };
