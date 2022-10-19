import React, { useState } from "react";
import FriendRequests from "./FriendRequests";
import ActiveBorrows from "./ActiveBorrows";
import ActiveLoans from	"./ActiveLoans";
import PendingTickets from "./PendingTickets";
import { GoTriangleUp} from "react-icons/go";
import { GoTriangleDown} from "react-icons/go";
import "./Dashboard.css";
import "./Notifications.css";

function Dashboard({ activeUser }) {
	const [showBorrows, setShowBorrows] = useState(false);
	const [showLoans, setShowLoans] = useState(false);
	const [showFriendRequests, setShowFriendRequests] = useState(false);
	const [showPendingTickets, setShowPendingTickets] = useState(false);

	return (
		<div id="dashboard">
			<div className="notifications">
				<div className="notifications-header">
					<GoTriangleUp style={{color: "var(--bright-red"}} />
					<h3>Friend Requests</h3>
					{showFriendRequests ? (
						<GoTriangleDown onClick={() => setShowFriendRequests(false)} />
					) : (
						<GoTriangleUp onClick={() => setShowFriendRequests(true)} />
					)}
				</div>
				{showFriendRequests ? <FriendRequests activeUser={activeUser} /> : null}
			</div>
			{showFriendRequests ? null : <div className="gray-divider"></div>}

			<div className="notifications">
				<div className="notifications-header">
					<GoTriangleUp style={{color: "var(--bright-red"}} />
					<h3>Pending Tickets</h3>
					{showPendingTickets ? (
						<GoTriangleDown onClick={() => setShowPendingTickets(false)} />
					) : (
						<GoTriangleUp onClick={() => setShowPendingTickets(true)} />
					)}
				</div>
				{showPendingTickets ? <PendingTickets activeUser={activeUser} /> : null}
			</div>
			{showPendingTickets ? null : <div className="gray-divider"></div>}

			<div className="notifications">
				<div className="notifications-header">
					<GoTriangleUp style={{color: "var(--bright-red"}} />
					<h3>Items You're Currently Borrowing</h3>
					{showBorrows ? (
						<GoTriangleDown onClick={() => setShowBorrows(false)} />
					) : (
						<GoTriangleUp onClick={() => setShowBorrows(true)} />
					)}
				</div>
				{showBorrows ? <ActiveBorrows activeUser={activeUser} /> : null}
			</div>
			{showBorrows ? null : <div className="gray-divider"></div>}

			<div className="notifications">
				<div className="notifications-header">
					<GoTriangleUp style={{color: "var(--bright-red"}} />
					<h3>Your Items Currently on Loan</h3>
					{showLoans ? (
						<GoTriangleDown onClick={() => setShowLoans(false)} />
					) : (
						<GoTriangleUp onClick={() => setShowLoans(true)} />
					)}
				</div>
				{showLoans ? <ActiveLoans activeUser={activeUser} /> : null}
			</div>
			{showLoans ? null : <div className="gray-divider"></div>}
		</div>
	);
}

export default Dashboard;