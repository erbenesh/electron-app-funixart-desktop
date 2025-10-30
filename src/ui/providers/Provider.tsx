import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import "#/api/httpSetup";
import { useEffect } from "react";
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
            {children}
        </QueryClientProvider>
    )
    
}