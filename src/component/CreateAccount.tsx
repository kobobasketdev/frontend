import { useState } from "react";
import AccountOTP from "./AccountOTP";
import LoginContent from "./LoginContent";

export default function CreateAccount({ showHeading }: { showHeading?: boolean }) {
	const [email, setEmail] = useState<string>('');
	const handleSetEmail = (email: string) => {
		setEmail(email);
		scrollTo({
			top: 0,
			behavior: 'instant'
		});
	};
	return (
		<>
			{
				email ? <AccountOTP email={email} handleClearEmail={handleSetEmail} /> : <LoginContent showHeading={showHeading} handleEmailPropagate={handleSetEmail} />
			}
		</>
	);
}