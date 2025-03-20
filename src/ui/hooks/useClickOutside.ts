import {useEffect} from "react";

export const useClickOutside = (ref, callback, check) => {

    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    };

    useEffect(() => {
        if (check === false) return ;
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });
}

export const useClickOutsideWithButton = (ref, callback, check, buttonRef) => {

    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
            callback();
        }
    };

    useEffect(() => {
        if (check === false) return ;
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });
}