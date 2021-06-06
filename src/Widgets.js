import React from "react";
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export default function Widgets() {
	const newsArticle = (heading, subtitle) => (
		<div className="widgets__article">
			<div className="widgets__articleLeft">
				<FiberManualRecordIcon />
			</div>
			<div className="widgets__articleRight">
				<h4>{heading}</h4>
				<p>{subtitle}</p>
			</div>
		</div>
	);

	return (
		<div className="widgets">
			<div className="widgets__header">
				<h2>LinkedIn News</h2>
				<InfoIcon />
			</div>
			{newsArticle("Shailesh Baneshi first", "Top News - 1000 readers")}
			{newsArticle("Covid Updates", "Top News - 108000 reader")}
			{newsArticle("Bitcoin News", "Top News - 700 reader")}
			{newsArticle("Real Estate boom", "Top News - 500 reader")}
		</div>
	);
}
