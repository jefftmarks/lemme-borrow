import React from "react";
import NotificationCard from "./NotificationCard";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function ActiveLoans({ loans }) {

	return (		
		<>	
			{loans.map((ticket) => (
				<Link
					to={`/ticket/${ticket.id}`}
					key={ticket.id}
				>
					<NotificationCard 
						ticket={ticket}
						status={"loan"}
				/></Link>
			))}
		</>
	);
}

export default ActiveLoans;