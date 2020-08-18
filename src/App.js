import React from "react";
import CourseDetail from "./components/CourseDetail";

class App extends React.Component {
  state = {
    courses: [],
    courseData: {},
    showData: false,
    userIp: "",
    continentCode: ""
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
        courseData.title = course.title
        return courseData;
      })
      .then(
        (courseData) => {
          this.setState({
            showData: true, 
            courseData: courseData,
          });
          console.log(courseData);
        },
        (error) => console.log(error)
      );
  }

  fetchLocation() {
    fetch(`https://geolocation-db.com/json/`)
    .then((res)=> res.json())
    .then((res)=>{
      this.setState({ userIp: res.IPv4 });
      fetch(
        `http://api.ipstack.com/${this.state.userIp}?access_key=${process.env.REACT_APP_GEO_API_KEY}`
      )
      .then((res)=> res.json())
      .then((location)=> {
        this.setState({ continentCode: location.continent_code }, () => console.log(this.state.continentCode))
      }, (error)=> console.log(error))
    })

  }

  handleClick(course) {
    // this.setState({ showData: true });
    
    this.fetchCourseData(course);
    
  }

  render() {
    return (
      <div className="App">
        {this.state.courses.map((course, index) => {
          return (
            <div key={index} className='courses'>
              <button onClick={() => this.handleClick(course)}>
                {course.title}
              </button>
            </div>
          );
        })}

        {this.state.showData ? (
          <div className='course-data'>
            <CourseDetail 
              courseData={this.state.courseData}
              continentCode={this.state.continentCode}
            />          

          </div>
          
        ) : (
          "Click on a course!"
        )}
      </div>
    );
  }
}

export default App;
