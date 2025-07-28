import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on client side only
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
            setIsLoaded(true);
        } catch (error) {
            console.error("Error reading from localStorage", error);
            setIsLoaded(true);
        }
    }, [key]);

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    };

    return [storedValue, setValue, isLoaded] as const;
}

export default useLocalStorage;