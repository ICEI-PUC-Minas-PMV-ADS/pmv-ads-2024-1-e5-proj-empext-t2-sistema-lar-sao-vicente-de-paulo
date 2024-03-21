'use client';

import { AppStore, makeStore } from '@/redux/store';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};
