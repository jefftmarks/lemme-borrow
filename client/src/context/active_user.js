import React, { createContext, useState } from "react";

const ActiveUserContext = createContext();

function ActiveUserProvider({ children }) {
	const [activeUser, setActiveUser] = useState(null);

	const value = [activeUser, setActiveUser];

	return (
		<ActiveUserContext.Provider value={value}  >
			{children}
		</ActiveUserContext.Provider>
	)
}

export { ActiveUserContext, ActiveUserProvider };