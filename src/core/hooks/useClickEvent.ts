import { useEffect } from 'react';

export const ClickEvent = (REF_ELEMENT: any, fn: Function) => {
    useEffect(() => {
        const clickEvent = () => {
            if (!REF_ELEMENT.current?.contains(event?.target)) fn();
        };
        document.addEventListener('mousedown', clickEvent);
        return () => {
            document.removeEventListener('mousedown', clickEvent);
        };
    }, []);
};
