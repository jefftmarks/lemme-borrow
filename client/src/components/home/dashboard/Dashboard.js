import React, { useState, useEffect, useContext } from "react";
import { ActiveUserContext } from "../../../context/active_user";
import FriendRequests from "./FriendRequests";
import ActiveBorrows from "./ActiveBorrows";
import ActiveLoans from	"./ActiveLoans";
import PendingTickets from "./PendingTickets";
import { GoTriangleUp} from "react-icons/go";
import { GoTriangleDown} from "react-icons/go";
import { MdNotifications } from "react-icons/md";
import "./Dashboard.css";

function Dashboard( ) {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	// Friend Requests
	const [friendRequests, setFriendRequests] = useState([]);
	const [showFriendRequests, setShowFriendRequests] = useState(false);
	// Items You're Borrowing
	const [borrows, setBorrows] = useState([]);
	const [showBorrows, setShowBorrows] = useState(false);
	// Items You've Loaned
	const [loans, setLoans] = useState([]);
	const [showLoans, setShowLoans] = useState(false);
	// Pending Requests
	const [pendingTickets, setPendingTickets] = useState([]);
	const [showPendingTickets, setShowPendingTickets] = useState(false);

	// ---------- Load Friend Requests ----------

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

	// ---------- Load Pending Tickets ----------

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

	// ---------- Load Active Borrows ----------

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

	// ---------- Load Active Loans ----------

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
		<div className="dashboard">
			<p className="dashboard-header">Dashboard</p>
			<div className="notifications">
				<div className={`notifications-header ${showFriendRequests}`}>
					<div className={friendRequests.length === 0 ? "zero" : null}>
						<MdNotifications />{friendRequests.length}
					</div>
					<p>Friend Requests</p>
					{showFriendRequests ? (
						<GoTriangleDown className="arrow" onClick={() => setShowFriendRequests(false)} />
					) : (
						<GoTriangleUp className="arrow" onClick={() => setShowFriendRequests(true)} />
					)}
				</div>
				{showFriendRequests ? (
					<div className="notifications-list">
						<FriendRequests
							friendRequests={friendRequests}
						/>
					</div>
				) : null}
			</div>
			<div className="notifications">
			<div className={`notifications-header ${showPendingTickets}`}>
				<div className={pendingTickets.length === 0 ? "zero" : null}>
					<MdNotifications />{pendingTickets.length}
					</div>
					<p>Pending Tickets</p>
					{showPendingTickets ? (
						<GoTriangleDown className="arrow" onClick={() => setShowPendingTickets(false)} />
					) : (
						<GoTriangleUp className="arrow" onClick={() => setShowPendingTickets(true)} />
					)}
				</div>
				{showPendingTickets ? (
					<div className="notifications-list">
						<PendingTickets
							pendingTickets={pendingTickets}
						/>
					</div>
				) : null}
			</div>
			<div className="notifications">
			<div className={`notifications-header ${showBorrows}`}>
					<div className={borrows.length === 0 ? "zero" : null}>
						<MdNotifications />{borrows.length}
					</div>
					<p>Items You're Currently Borrowing</p>
					{showBorrows ? (
						<GoTriangleDown className="arrow" onClick={() => setShowBorrows(false)} />
					) : (
						<GoTriangleUp className="arrow" onClick={() => setShowBorrows(true)} />
					)}
				</div>
					{showBorrows ? (
						<div className="notifications-list">
							<ActiveBorrows
								borrows={borrows}
							/>
						</div>
					) : null}
			</div>
			<div className="notifications">
			<div className={`notifications-header ${showLoans}`}>
					<div className={loans.length === 0 ? "zero" : null}>
						<MdNotifications />{loans.length}
					</div>
					<p>Your Items Currently on Loan</p>
					{showLoans ? (
						<GoTriangleDown className="arrow" onClick={() => setShowLoans(false)} />
					) : (
						<GoTriangleUp className="arrow" onClick={() => setShowLoans(true)} />
					)}
				</div>
					{showLoans ? (
						<div className="notifications-list">
							<ActiveLoans
								loans={loans}
							/>
						</div>
					) : null}
			</div>
		</div>
	);
}

export default Dashboard;