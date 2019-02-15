import React, {Component, Fragment} from 'react'
import {schedules} from '../schedules';
import {SportSelector} from "./SportSelector";
import {KeyDates} from './KeyDates';
import {Legend} from './Legend';

export class CalendarFrame extends Component {
  constructor() {
    super()
    this.state= {
      context: null,
      radius: null
    }
  }
  
  componentDidMount() {
    this.instantiateCanvas()
  }
  
  instantiateCanvas = async () => {
    const frame = this.refs.frame;
    const ctx = frame.getContext('2d');
    await this.setState({
      frame: frame,
      context: ctx
    })
    this.setFrame(this.state.frame, this.state.context);
  }
  
  restartCanvas = () => {
    const {radius, context} = this.state;
    this.drawFrame(context, radius);
    this.drawMonths(context, radius);
  }
  
  setFrame = () => {
    const {frame, context} = this.state;
    let radius = frame.height / 2;
    context.translate(radius, radius);
    radius = radius * .9;
    this.setState({radius: radius})
    try {
      this.drawFrame(context, radius);
      this.drawMonths(context, radius);
    } catch (e) {
      console.error("=============> e: ", e);
    }
  }
  
  drawFrame = async () => {
    const {radius, context} = this.state;
    let outerGradient, calendarGradient, innerGradient;
    
    //draw frame
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle='#44D7A8';
    context.fill()
    
    //frame gradient
    outerGradient = context.createRadialGradient(0, 0, radius * 0.98, 0, 0, radius * 1.02);
    outerGradient.addColorStop(0, '#253529');
    outerGradient.addColorStop(.5, '#FFFFFF');
    outerGradient.addColorStop(1, '#253529');
    context.strokeStyle = outerGradient;
    context.lineWidth = radius * 0.05;
    context.stroke();
    context.closePath()
  
    //calendar border
    context.beginPath();
    context.arc(0, 0, radius * .7, 0, 2 * Math.PI);
    calendarGradient = context.createRadialGradient(0, 0, radius * 0.7, 0, 0, radius * .72);
    calendarGradient.addColorStop(0, '#253529');
    calendarGradient.addColorStop(.25, '#FFFFFF');
    calendarGradient.addColorStop(.75, '#253529');
    calendarGradient.addColorStop(1, '#253529');
    context.strokeStyle = calendarGradient;
    context.lineWidth = radius * 0.04;
    context.stroke();
    context.closePath()
    
    //inner circle gradient
    innerGradient = context.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius * .2)
    innerGradient.addColorStop(0, '#FFCC33');
    innerGradient.addColorStop(.2, '#FFFF66');
    innerGradient.addColorStop(.75, '#FF7A00');
    innerGradient.addColorStop(1, '#FFCC33');
    //draw inner circle
    context.beginPath();
    context.arc(0, 0, radius * .215, 0, 2 * Math.PI);
    context.fillStyle = innerGradient;
    context.strokeStyle = '#222222'
    context.lineWidth = 4;
    context.fill();
    context.stroke();
    context.closePath();
  }
  
  toRadians= (degrees) => {
    return degrees * (Math.PI/180);
  }
  
  drawMonths = () => {
    let ang;
    const {context, radius} = this.state;
    const months = ['February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January'];
    context.fillStyle = '#253529';
    context.font = radius * .055 + 'px arial';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    months.forEach((month, i)=> {
      let nonZeroI = i+1;
      ang = nonZeroI * Math.PI / 6;
      context.rotate(ang);
      context.translate(0, -radius * 0.85);
      context.rotate(-ang);
      context.fillText(month, 0, 0);
      context.rotate(ang);
      context.translate(0, radius * 0.85);
      context.rotate(-ang);
    })
  }
  
  getDayOfYearAndCirclify = (date) => {
  
    const now = date;
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const daysified = Math.floor(diff / oneDay);
    const percentage = (daysified/365).toFixed(3);
    const degrees = percentage* 360.0;
    const radians = this.toRadians(degrees);
    return radians;
  }
  
  drawSport = (radius, sport) => {
    const context = this.state.context;
    
    const self = this;
    function drawSeason(start, end, grad1, grad2) {
      let sportGradient;
  
      context.beginPath();
      context.rotate(self.toRadians(-90))
      const startAngle = start;
      const endAngle = end;
  
      context.arc(0, 0, radius * .45, startAngle, endAngle, false);
      sportGradient = context.createRadialGradient(0, 0, radius * 0.15, 0, 0, radius * 0.7);
      sportGradient.addColorStop(0, grad1);
      sportGradient.addColorStop(1, grad2);
      context.strokeStyle = sportGradient;
      context.lineWidth = radius*.46;
      context.stroke();
      context.rotate(self.toRadians(90))
      context.closePath()
    }
    drawSeason(self.getDayOfYearAndCirclify(sport.startPreSeason), self.getDayOfYearAndCirclify(sport.endPreSeason), '#093028', '#237A57', 'Preseason');
    drawSeason(self.getDayOfYearAndCirclify(sport.startRegularSeason), self.getDayOfYearAndCirclify(sport.endRegularSeason), '#333333', '#dd1818', 'Regular Season');
    drawSeason(self.getDayOfYearAndCirclify(sport.startPostSeason), self.getDayOfYearAndCirclify(sport.endPostSeason), '#4A00E0', '#8E2DE2', 'Postseason');

}
  
  render() {
    console.log(this.state)
    return(
      <Fragment>
        <canvas ref={'frame'} width={600} height={600} style={{backgroundColor:'#353839', border:'1px solid #A0E6FF'}} />
        <Legend />
        <SportSelector instantiateCanvas={this.restartCanvas} changeSportCallback={this.drawSport} context={this.state.context} radius={this.state.radius} />
        <KeyDates />
      </Fragment>
    )
  }
}

export default CalendarFrame;