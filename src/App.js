import React from "react";
import CourseDetail from "./components/CourseDetail";
import "./App.css";
import Logo from "./img/1587802554_indigo_inverted.png";

class App extends React.Component {
  state = {
    courses: [],
    courseData: {},
    showData: false,
    userIp: "",
    continentCode: "",
  };

  componentDidMount() {
    this.fetchCourses();
    this.fetchLocation();
  }

  fetchCourses() {
    fetch("https://private-e05942-courses22.apiary-mock.com/courses")
      .then((res) => res.json())
      .then(
        (courses) => {
          this.setState({ courses: courses });
        },
        (error) => console.log(error)
      );
  }

  fetchCourseData(course) {
    fetch(
      `https://private-e05942-courses22.apiary-mock.com/courses/${course.slug}`
    )
      .then((res) => res.json())
      .then((courseData) => {
        //Add title to courseData
        courseData.title = course.title;
        return courseData;
      })
      .then(
        (courseData) => {
          this.setState({
            showData: true,
            courseData: courseData,
          });
        },
        (error) => console.log(error)
      );
  }

  fetchLocation() {
    fetch(`https://geolocation-db.com/json/`)
      .then((res) => res.json())
      .then((res) => {
        //Set user IP Address for GEO Location
        this.setState({ userIp: res.IPv4 });
        fetch(
          `http://api.ipstack.com/${this.state.userIp}?access_key=${process.env.REACT_APP_GEO_API_KEY}`
        )
          .then((res) => res.json())
          .then(
            (location) => {
              this.setState({ continentCode: location.continent_code }, () =>
                console.log(this.state.continentCode)
              );
            },
            (error) => console.log(error)
          );
      });
  }

  handleClick(course) {
    this.fetchCourseData(course);
  }

  collapseInfo() {
    this.setState({ showData: false });
  }

  render() {
    return (
      <div className="App">
        <div className="courseDiv">
          <img src={Logo} alt="CF Logo"></img>

          {this.state.courses.map((course, index) => {
            return (
              <div key={index} className="courses">
                <button onClick={() => this.handleClick(course)}>
                  {course.title}
                </button>
              </div>
            );
          })}
        </div>

        {this.state.showData ? (
          <div className="course-data">
            <CourseDetail
              courseData={this.state.courseData}
              continentCode={this.state.continentCode}
            />
            <button className="closeButton" onClick={() => this.collapseInfo()}>
              Close Details
            </button>
          </div>
        ) : (
          <div className="click-text">Click a course for more info</div>
        )}
      </div>
    );
  }
}

export default App;
