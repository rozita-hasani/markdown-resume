"use client";

import {useState, useRef, useEffect, Suspense} from "react";
import Editor from "@/components/editor/Editor";
import Sidebar from "@/components/sidebar/Sidebar";
import Preview from "@/components/preview/Preview";
import {themes} from "@/lib/constants";
import '../../styles/globals.css'
import {useSearchParams} from "next/navigation";

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
    const [theme, setTheme] = useState<string>(template ?? "Tehran");
    const [fontScale, setFontScale] = useState<number>(1);
    const [headingScale, setHeadingScale] = useState<number>(1);
    const [lineHeightScale, setLineHeightScale] = useState<number>(1.5);
    const [paddingScale, setPaddingScale] = useState<number>(24);
    const [font, setFont] = useState<string>("'Inter', 'Noto Sans SC', sans-serif");
    const [headerColor, setHeaderColor] = useState<string>("#000000");
    const [textColor, setTextColor] = useState<string>("#000000");
    const [linkColor, setLinkColor] = useState<string>("#1a73e8");

    const previewContainerRef = useRef<HTMLDivElement>(null);

    // Fetch the template and set the markdown state
    useEffect(() => {
        if (template) {
            fetch(`/resumes/${template}.md`)
                .then((res) => {
                    if (!res.ok) {
                        setMarkdown("Unable to load the template from the given URL.");
                    } else {
                        res.text().then(setMarkdown);
                        setTheme(template)
                    }
                })
                .catch(() => {
                    setMarkdown("Unable to load the template from the given URL.");
                });
        }
    }, [template]);

    // Update CSS variables in the previewContainer
    useEffect(() => {
        const previewContainer = previewContainerRef.current;
        if (previewContainer) {
            previewContainer.style.setProperty('--fontScale', fontScale.toString());
            previewContainer.style.setProperty("--headingScale", headingScale.toString());
            previewContainer.style.setProperty('--lineHeightScale', lineHeightScale.toString());
            previewContainer.style.setProperty('--paddingScale', `${paddingScale}px`);
            previewContainer.style.setProperty("--headerColor", headerColor);
            previewContainer.style.setProperty("--textColor", textColor);
            previewContainer.style.setProperty("--linkColor", linkColor);
        }
    }, [fontScale, headingScale, lineHeightScale, paddingScale, headerColor, textColor, linkColor]);

    const handleThemeChange = (selectedTheme: string) => {
        setTheme(selectedTheme);
        setFont(themes[selectedTheme].fontName);
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
                handlePrint={handlePrint}
                onThemeChange={handleThemeChange}
                onFontChange={setFont}
                onFontSizeChange={setFontScale}
                onLineHeightChange={setLineHeightScale}
                onPaddingChange={setPaddingScale}
                fontScale={fontScale}
                lineHeightScale={lineHeightScale}
                headingScale={headingScale}
                onHeadingChange={setHeadingScale}
                paddingScale={paddingScale}
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