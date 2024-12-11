
export const fonts: { [key: string]: string } = {
    "Open Sans": 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
    "Noto Sans": 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap',
    "Ubuntu": 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap',
    'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
    'Poppins': 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap',
    'Nunito': 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap',
    'Work Sans': 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap',
    "Merriweather": 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap',
    "PT Sans": 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap',
    "Karla": 'https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap',
    "Overpass Mono": 'https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@400;700&display=swap',
    "Raleway": 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap',
    "Montserrat": 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap',
    "Inika": 'https://fonts.googleapis.com/css2?family=Inika:wght@400;700&display=swap',
    "Lato": 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap'
};


interface ThemeProps {
    fontName: string;
    fontScale: number;
    headingScale: number;
    lineHeightScale: number;
    xPaddingScale: number;
    yPaddingScale: number;
    headerColor: string;
    textColor: string;
    linkColor: string;
}

export const themes: { [key: string]: ThemeProps } = {
    tehran: {
        fontName: 'Inter',
        fontScale: 1,
        headingScale: 1,
        lineHeightScale: 1.5,
        xPaddingScale: 24,
        yPaddingScale: 0,
        headerColor: "#222",
        textColor: '#444',
        linkColor: "#1a73e8"
    },
    isfahan: {
        fontName: 'Poppins',
        fontScale: 1,
        headingScale: 1,
        lineHeightScale: 1.5,
        xPaddingScale: 24,
        yPaddingScale: 0,
        headerColor: "#016ef1",
        textColor: '#222',
        linkColor: "#1a73e8"
    },
    shiraz: {
        fontName: 'Nunito',
        fontScale: 1,
        headingScale: 1,
        lineHeightScale: 1.5,
        xPaddingScale: 24,
        yPaddingScale: 0,
        headerColor: "#222",
        textColor: '#444',
        linkColor: "#1a73e8"
    },
    mashhad: {
        fontName: 'Work Sans',
        fontScale: 1,
        headingScale: 1,
        lineHeightScale: 1.5,
        xPaddingScale: 24,
        yPaddingScale: 0,
        headerColor: "#222",
        textColor: '#222',
        linkColor: "#1a73e8"
    }
};

export enum ThemeList {
    tehran = 'Tehran',
    isfahan = 'Isfahan',
    shiraz = 'Shiraz',
    mashhad = 'Mashhad',
}