import React from "react";

export default function CourseDetail(props) {
  return (
    <div className="eachCourse">
      <h1>{props.courseData.title}</h1>
      <hr></hr>
      <div className="courseDetails">
        <div>
          {props.courseData.title === "Full-Stack Immersion"
            ? "A fully immersive Full-Stack Web Development program"
            : props.courseData.description}
        </div>
        <div>
          Price:{" "}
          {props.continentCode === "EU"
            ? props.courseData.prices[1].amount + "€"
            : props.courseData.prices[0].amount + "$"}
        </div>
        <div>Next start Date: {new Date(props.courseData.start_dates[0]).toString().slice(0,15).replace(/-/g,'/')}</div>

        <select>
          <option>Other Start Dates</option>
          {props.courseData.start_dates.slice(1).map((date) => {
            return <option>{new Date(date).toString().slice(0,15).replace(/-/g,'/')}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
