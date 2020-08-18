import React from "react";

export default function CourseDetail(props) {
  return (
    <div>
      <div>{props.courseData.title}</div>
      <div>
        {props.courseData.title === "Full-Stack Immersion"
          ? "A fully immersive Full-Stack Web Development Program"
          : props.courseData.description}
      </div>
      <div>
        Price:{" "}
        {props.continentCode === "EU"
          ? props.courseData.prices[1].amount + "€"
          : props.courseData.prices[0].amount + "$"}
      </div>
      <div>Next start Date:{props.courseData.start_dates[0]}</div>

      <select>
        <option>Other Start Dates</option>
        {props.courseData.start_dates.slice(1).map((date) => {
          return <option>{date}</option>;
        })}
      </select>
    </div>
  );
}
