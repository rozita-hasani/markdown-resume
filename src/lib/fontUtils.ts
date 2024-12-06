export const loadFont = (fontUrl: string) => {
    const linkId = 'font-link';
    let linkElement = document.getElementById(linkId) as HTMLLinkElement;

    if (linkElement) {
        linkElement.href = fontUrl;
    } else {
        linkElement = document.createElement('link');
        linkElement.id = linkId;
        linkElement.rel = 'stylesheet';
        linkElement.href = fontUrl;
        document.head.appendChild(linkElement);
    }
};