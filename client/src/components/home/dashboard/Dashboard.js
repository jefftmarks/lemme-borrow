import React, { useState, useEffect } from "react";
import FriendRequests from "./FriendRequests";
import ActiveBorrows from "./ActiveBorrows";
import ActiveLoans from	"./ActiveLoans";
import PendingTickets from "./PendingTickets";
import { GoTriangleUp} from "react-icons/go";
import { GoTriangleDown} from "react-icons/go";
import "./Dashboard.css";
import "./Notifications.css";

function Dashboard({ activeUser }) {
	const [friendRequests, setFriendRequests] = useState([]);
	const [showFriendRequests, setShowFriendRequests] = useState(false);

	const [borrows, setBorrows] = useState([]);
	const [showBorrows, setShowBorrows] = useState(false);

	const [loans, setLoans] = useState([]);
	const [showLoans, setShowLoans] = useState(false);

	const [pendingTickets, setPendingTickets] = useState([]);
	const [showPendingTickets, setShowPendingTickets] = useState(false);

	// ---------- Grab Friend Requests ----------

	useEffect(() => {
		fetch(`/friend_requests/user/${activeUser.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((requests) => {
						setFriendRequests(requests);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}, [activeUser]);

	// ---------- Grab Pending Tickets ----------

	useEffect(() => {
		fetch(`/tickets/requests/${activeUser.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((tickets) => {
						setPendingTickets(tickets);
					});
				} else {
					res.json().then((data) => console.log(data))
				}
			})
	}, [activeUser]);

	// ---------- Grab Active Borrows ----------

	useEffect(() => {
		fetch(`/tickets/borrows/${activeUser.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((tickets) => {
						setBorrows(tickets);
					});
				} else {
					res.json().then((data) => console.log(data))
				}
			})
	}, [activeUser]);

	// ---------- Grab Active Loans ----------

	useEffect(() => {;
		fetch(`/tickets/loans/${activeUser.id}`)
			.then((res) => {
				if (res.ok) {
					res.json().then((tickets) => {
						setLoans(tickets);
					});
				} else {
					res.json().then((data) => console.log(data));
				}
			});
	}, [activeUser]);

	return (
		<div id="dashboard">
			<div className="notifications">
				<div className="notifications-header">
					<div className={friendRequests.length === 0 ? "zero" : null}>
						{friendRequests.length}
					</div>
					<h3>Friend Requests</h3>
					{showFriendRequests ? (
						<GoTriangleDown onClick={() => setShowFriendRequests(false)} />
					) : (
						<GoTriangleUp onClick={() => setShowFriendRequests(true)} />
					)}
				</div>
				{showFriendRequests ? (
					<FriendRequests
						activeUser={activeUser}
						setFriendRequests={setFriendRequests}
						friendRequests={friendRequests}
					/>
				) : null}
			</div>
			{showFriendRequests ? null : <div className="gray-divider"></div>}

			<div className="notifications">
				<div className="notifications-header">
				<div className={pendingTickets.length === 0 ? "zero" : null}>
						{pendingTickets.length}
					</div>
					<h3>Pending Tickets</h3>
					{showPendingTickets ? (
						<GoTriangleDown onClick={() => setShowPendingTickets(false)} />
					) : (
						<GoTriangleUp onClick={() => setShowPendingTickets(true)} />
					)}
				</div>
				{showPendingTickets ? (
					<PendingTickets
						activeUser={activeUser}
						setPendingTickets={setPendingTickets}
						pendingTickets={pendingTickets}
					/>
				) : null}
			</div>
			{showPendingTickets ? null : <div className="gray-divider"></div>}

			<div className="notifications">
				<div className="notifications-header">
					<div className={borrows.length === 0 ? "zero" : null}>
						{borrows.length}
					</div>
					<h3>Items You're Currently Borrowing</h3>
					{showBorrows ? (
						<GoTriangleDown onClick={() => setShowBorrows(false)} />
					) : (
						<GoTriangleUp onClick={() => setShowBorrows(true)} />
					)}
				</div>
				{showBorrows ? (
					<ActiveBorrows
						activeUser={activeUser}
						setBorrows={setBorrows}
						borrows={borrows}
					/>
				) : null}
			</div>
			{showBorrows ? null : <div className="gray-divider"></div>}

			<div className="notifications">
				<div className="notifications-header">
					<div className={loans.length === 0 ? "zero" : null}>
						{loans.length}
					</div>
					<h3>Your Items Currently on Loan</h3>
					{showLoans ? (
						<GoTriangleDown onClick={() => setShowLoans(false)} />
					) : (
						<GoTriangleUp onClick={() => setShowLoans(true)} />
					)}
				</div>
				{showLoans ? (
					<ActiveLoans
						activeUser={activeUser}
						setLoans={setLoans}
						loans={loans}
					/>
				) : null}
			</div>
			{showLoans ? null : <div className="gray-divider"></div>}
		</div>
	);
}

export default Dashboard;