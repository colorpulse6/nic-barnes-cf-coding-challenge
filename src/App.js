import React from "react";

class App extends React.Component {
  state = {
    courses: [],
    courseData:{},
    showData:false
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

  fetchCourseData(course) {
    fetch(
      `https://private-e05942-courses22.apiary-mock.com/courses/${course.slug}`
    )
    .then((res)=> res.json())
    .then((courseData)=> {
      return courseData
    })
    .then(
      (courseData) => {
        this.setState({
          courseData: courseData,
        });
        console.log(courseData)
      },
      (error) => console.log(error)
      
    )
    
  }

  handleClick(course){
    this.setState({showData:true},() => console.log(this.state.showData))
    
    this.fetchCourseData(course)
    
  }

  render() {
    return (
      <div className="App">
        {this.state.courses.map((course, index) => {
          return <div key={index}>
          <button onClick={() => this.handleClick(course)}>{course.title}</button>

          </div>;
        })}
        {this.state.showData ? 
        <div>{this.state.courseData.description}</div> : 'Click on a course!'}

      </div>
    );
  }
}

export default App;
