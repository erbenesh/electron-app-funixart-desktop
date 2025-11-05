import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "ui-kit";
import "#/api/client"; // Initialize API client
import { initTelegram } from "#/telegram/initTelegram";
import { QueryProvider } from "./QueryProvider";
import { ErrorBoundary } from "#/components/ErrorBoundary/ErrorBoundary";

type Props = {
    children: ReactNode;
};

export function Provider({children} : Props) {

    useEffect(() => {
        void initTelegram();
    }, []);

    return (
        <ErrorBoundary>
            <QueryProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </QueryProvider>
        </ErrorBoundary>
    )
    
}