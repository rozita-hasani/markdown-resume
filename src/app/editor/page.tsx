"use client";

import {useState, useRef, useEffect, Suspense} from "react";
import Editor from "@/components/editor/Editor";
import Sidebar from "@/components/sidebar/Sidebar";
import Preview from "@/components/preview/Preview";
import {fonts, themes} from "@/lib/constants";
import '../../styles/globals.css'
import {useSearchParams} from "next/navigation";
import {loadFont} from "@/lib/fontUtils";

export default function EditorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditorPageContent />
        </Suspense>
    );
}

function EditorPageContent() {
    const searchParams = useSearchParams();
    const template = searchParams.get("template");

    const [markdown, setMarkdown] = useState<string>();
    const [theme, setTheme] = useState<string>(template);
    const [font, setFont] = useState<string>(themes[theme]?.fontName ?? 'Open Sans');
    const [fontScale, setFontScale] = useState<number>(themes[theme]?.fontScale ?? 1);
    const [headingScale, setHeadingScale] = useState<number>(themes[theme]?.headingScale ?? 1);
    const [lineHeightScale, setLineHeightScale] = useState<number>(themes[theme]?.lineHeightScale ?? 1.5);
    const [xPaddingScale, setXPaddingScale] = useState<number>(themes[theme]?.xPaddingScale ?? 20);
    const [yPaddingScale, setYPaddingScale] = useState<number>(themes[theme]?.yPaddingScale ?? 20);
    const [headerColor, setHeaderColor] = useState<string>(themes[theme]?.headerColor ?? '#000');
    const [textColor, setTextColor] = useState<string>(themes[theme]?.textColor ?? '#000');
    const [linkColor, setLinkColor] = useState<string>(themes[theme]?.linkColor ?? '#1a73e8');

    const previewContainerRef = useRef<HTMLDivElement | null>(null);

    // Fetch the template and set the markdown state
    useEffect(() => {
        if (template) {
            fetch(`/resumes/${template}.md`)
                .then((res) => {
                    if (!res.ok) {
                        setMarkdown("Unable to load the template from the given URL.");
                    } else {
                        res.text().then(setMarkdown);
                        applyThemeSettings(template)
                    }
                })
                .catch(() => {
                    setMarkdown("Unable to load the template from the given URL.");
                });
        }
    }, [template]);

    useEffect(() => {
        loadFont(fonts[font]);
    }, [font]);

    // Utility function to apply theme settings
    const applyThemeSettings = (themeName: string) => {
        const selectedTheme = themes[themeName.toLowerCase()];

        setFont(selectedTheme.fontName);
        setFontScale(selectedTheme.fontScale);
        setHeadingScale(selectedTheme.headingScale);
        setLineHeightScale(selectedTheme.lineHeightScale);
        setXPaddingScale(selectedTheme.xPaddingScale);
        setYPaddingScale(selectedTheme.yPaddingScale);
        setHeaderColor(selectedTheme.headerColor);
        setTextColor(selectedTheme.textColor);
        setLinkColor(selectedTheme.linkColor);
    };

    // Update CSS variables in the previewContainer
    useEffect(() => {
        const previewContainer = previewContainerRef.current;
        if (previewContainer) {
            previewContainer.style.setProperty('--fontName', font);
            previewContainer.style.setProperty('--fontScale', fontScale.toString());
            previewContainer.style.setProperty("--headingScale", headingScale.toString());
            previewContainer.style.setProperty('--lineHeightScale', lineHeightScale.toString());
            previewContainer.style.setProperty('--xPaddingScale', `${xPaddingScale}px`);
            previewContainer.style.setProperty('--yPaddingScale', `${yPaddingScale}px`);
            previewContainer.style.setProperty("--headerColor", headerColor);
            previewContainer.style.setProperty("--textColor", textColor);
            previewContainer.style.setProperty("--linkColor", linkColor);
        }
    }, [font, fontScale, headingScale, lineHeightScale, xPaddingScale, yPaddingScale, headerColor, textColor, linkColor]);

    const handleThemeChange = (selectedTheme: string) => {
        setTheme(selectedTheme.toLowerCase());
        applyThemeSettings(selectedTheme);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full h-full min-h-screen bg-gray-100">
            <div className="main-content gap-3 pr-[310px] h-full">
                <div className="flex justify-center items-start w-full h-screen">
                    <Editor markdown={markdown} onChangeAction={setMarkdown}/>
                    <Preview content={markdown} theme={theme} font={font} previewContainerRef={previewContainerRef}/>
                </div>
            </div>
            <Sidebar
                font={font}
                setFont={setFont}
                handlePrint={handlePrint}
                onThemeChange={handleThemeChange}
                onFontChange={setFont}
                onFontSizeChange={setFontScale}
                onLineHeightChange={setLineHeightScale}
                onXPaddingChange={setXPaddingScale}
                onYPaddingChange={setYPaddingScale}
                fontScale={fontScale}
                lineHeightScale={lineHeightScale}
                headingScale={headingScale}
                onHeadingChange={setHeadingScale}
                xPaddingScale={xPaddingScale}
                yPaddingScale={yPaddingScale}
                selectedTheme={theme}
                headerColor={headerColor}
                setHeaderColor={setHeaderColor}
                textColor={textColor}
                setTextColor={setTextColor}
                linkColor={linkColor}
                setLinkColor={setLinkColor}
            />
        </div>
    );
}