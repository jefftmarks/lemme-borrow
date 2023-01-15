import React from "react";
import "./About.css";

function About() {
	return (
		<div className="about">
			<div className="about-text">
				<h1>About lemmeBorrow</h1>
				<p>lemmeBorrow was created by <a href="https://www.linkedin.com/in/jeffmarks114/">Jeff Marks</a> as part of a project to practice full-stack web development</p>
				<p>In its current state, this application exists for demo purposes only</p>
				<p>View a video walkthrough <a href="https://www.youtube.com/watch?v=iGXqGhgbPz8">here</a></p>
				<p>Learn more about the app and how it functions on <a href="https://github.com/jefftmarks/lemme-borrow">GitHub</a></p>
				<p>Questions? Email Jeff at jeff.t.marks@gmail.com . . . or create an account on lemmeBorrow and accept his friend request &#128526;</p>
			</div>
		</div>
	);
}

export default About;