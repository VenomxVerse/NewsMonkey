
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";


export default class App extends Component {
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API_KEY
  state = {
    progress : 0
  }

  setProgress = (progress) => {
    this.setState({progress:progress})
  }

  render(){
    return (
      <BrowserRouter>
        <Navbar/>
         <LoadingBar
        color="#f11946"
        progress={this.state.progress}
      />
       <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="us" category="general"/>} />
          <Route path="/sport" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sport" pageSize={this.pageSize} country="us" category="sport"/>} />
          <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="us" category="science"/>} />
          <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general2" pageSize={this.pageSize} country="us" category="general"/>} />
          <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="us" category="business"/>} />
          <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="us" category="health"/>} />
          <Route path="/environment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/>} />
          <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="us" category="technology"/>} />
       </Routes>
       </BrowserRouter>
    )
  }
}


