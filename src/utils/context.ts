import { createContext, Dispatch, SetStateAction } from 'react';

type TContext = {
	handleShowGuestLogin: Dispatch<SetStateAction<boolean>>; handleSetGuestEmail: Dispatch<SetStateAction<string>>;
};
export const GuestContext = createContext<TContext | null>(null);

export const WishlistIdContext = createContext<Set<string>>(new Set());
