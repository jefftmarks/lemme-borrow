import React from "react";
import "./About.css";

function About() {
	return (
		<div className="about">
			<div className="about-text">
				<h1>About lemmeBorrow</h1>
				<p>lemmeBorrow was created by <a href="https://www.linkedin.com/in/jeffmarks114/">Jeff Marks</a> as part of a project to practice full-stack web development</p>
				<p>In its current state, this application exists for demo purposes only</p>
				<p>Learn more about the app and how it functions on <a href="https://github.com/jefftmarks/lemme-borrow">GitHub</a></p>
				<em><p>WebSockets have been disabled for deployment purposes but can be demonstrated on the "action-cable-demo" branch in the above GitHub repository</p></em>
				<p>Questions? Email Jeff at jeff.t.marks@gmail.com . . . or friend him on lemmeBorrow by searching for "Jeff Marks" &#128526;</p>
			</div>
		</div>
	);
}

export default About;