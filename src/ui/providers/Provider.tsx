import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "ui-kit";
import "#/api/httpSetup";
import { initTelegram } from "#/telegram/initTelegram";

type Props = {
    children: ReactNode;
};

const queryClient = new QueryClient();

export function Provider({children} : Props) {

    useEffect(() => {
        void initTelegram();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
    
}