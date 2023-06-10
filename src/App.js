import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News  from './Components/News';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  pSize = 5;
  
  state ={
    progress: 0
  }
  setProgress = (progress) =>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar color='#f11946' progress={this.state.progress}  />
          <Routes>
            {/* <News setProgress={this.setProgress} url="https://Newsapi.org/v2/top-headlines?" country="in" category="politics" apikey="00f9fed5d28941e99bfaafd4badaf180" pageSize={5} /> */}
            {/* <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" url="https://Newsapi.org/v2/top-headlines?" country="in" category="health" apikey="00f9fed5d28941e99bfaafd4badaf180" pageSize={5} />} /> */}
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pSize} />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" country="in" category="business" pageSize={this.pSize} />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" country="in" category="entertainment" pageSize={this.pSize} />} />
            {/* <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" country="in" category="general" pageSize={this.pSize} />} /> */}
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" country="in" category="health" pageSize={this.pSize} />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" country="in" category="science" pageSize={this.pSize} />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" country="in" category="sports" pageSize={this.pSize} />} />
            <Route exact path="/politics" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="politics" country="in" category="politics" pageSize={this.pSize} />} />
            <Route exact path="/about" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="about" country="in" category="about" pageSize={this.pSize} />} />
            <Route exact path="/contact" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="contact" country="in" category="contact" pageSize={this.pSize} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}


