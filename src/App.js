import React from "react";

class App extends React.Component {
  state = {
    courses: [],
  };
  
  componentDidMount() {
    this.fetchCourses();
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

  render() {
    return (
      <div className="App">
        {this.state.courses.map((course, index) => {
          return <div key={index}>{course.title}</div>;
        })}
      </div>
    );
  }
}

export default App;
