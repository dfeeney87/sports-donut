import React, {Component, Fragment} from 'react'
import {schedules} from '../schedules';

export class CalendarFrame extends Component {
  componentDidMount() {
    const frame = this.refs.frame;
    const ctx = frame.getContext('2d');
    this.setFrame(frame, ctx);
  }
  
  setFrame = (frame, context) => {
    let radius = frame.height / 2;
    context.translate(radius, radius);
    radius = radius * .9;
    
    this.drawFrame(context, radius);
    this.drawMonths(context, radius);
  }
  
  drawFrame = async (context, calendarRadius) => {
    let outerGradient, calendarGradient, innerGradient;
    
    //draw frame
    context.beginPath();
    context.arc(0, 0, calendarRadius, 0, 2 * Math.PI);
    context.fillStyle='#44D7A8';
    context.fill()
    
    //frame gradient
    outerGradient = context.createRadialGradient(0, 0, calendarRadius * 0.98, 0, 0, calendarRadius * 1.02);
    outerGradient.addColorStop(0, '#253529');
    outerGradient.addColorStop(.5, '#FFFFFF');
    outerGradient.addColorStop(1, '#253529');
    context.strokeStyle = outerGradient;
    context.lineWidth = calendarRadius * 0.05;
    context.stroke();
    context.closePath()
  
    //calendar border
    context.beginPath();
    context.arc(0, 0, calendarRadius * .7, 0, 2 * Math.PI);
    calendarGradient = context.createRadialGradient(0, 0, calendarRadius * 0.7, 0, 0, calendarRadius * .72);
    calendarGradient.addColorStop(0, '#253529');
    calendarGradient.addColorStop(.25, '#FFFFFF');
    calendarGradient.addColorStop(.75, '#253529');
    calendarGradient.addColorStop(1, '#253529');
    context.strokeStyle = calendarGradient;
    context.lineWidth = calendarRadius * 0.04;
    context.stroke();
    context.closePath()
    
    //inner circle gradient
    innerGradient = context.createRadialGradient(0, 0, calendarRadius * 0.05, 0, 0, calendarRadius * .15)
    innerGradient.addColorStop(0, '#FFCC33');
    innerGradient.addColorStop(.25, '#FFFF66');
    innerGradient.addColorStop(.75, '#FF7A00');
    innerGradient.addColorStop(1, '#FFCC33');
  
    await this.drawSport(context, calendarRadius, schedules.baseball);
    //draw inner circle
    context.beginPath();
    context.arc(0, 0, calendarRadius * .15, 0, 2 * Math.PI);
    context.fillStyle = innerGradient;
    context.fill();
    context.closePath();
    
  }
  
  toRadians= (degrees) => {
    return degrees * (Math.PI/180);
  }
  
  drawMonths = (context, radius) => {
    let ang;
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
  
  drawSport = (context, radius, sport) => {
    let baseballStart = sport.startRegularSeason;
    let baseballEnd = sport.endRegularSeason;
    let sportGradient;
  
    console.error("=============> baseballStart: ", this.getDayOfYearAndCirclify(baseballStart));
    console.error("=============> baseballEnd: ", this.getDayOfYearAndCirclify(baseballEnd));
    context.beginPath();
    context.rotate(this.toRadians(90))
    //the start angle should be the beginning of the season,
      // 0 is 3,
      // .5 * pi is 6,
      // Pi is 9,
      // 1.5 * Pi is 12,
    //need some sort of an algorithm that takes 1 based values and computes the start angle
    context.arc(0, 0, radius * .45, 0, .5 * Math.PI, false);
    sportGradient = context.createRadialGradient(0, 0, radius * 0.15, 0, 0, radius * 0.7);
    sportGradient.addColorStop(0, '#333333');
    sportGradient.addColorStop(1, '#dd1818');
    context.strokeStyle = sportGradient;
    // context.strokeStyle ='#dd1818'
    context.lineWidth = radius*.46;
    context.stroke();
    context.rotate(this.toRadians(-90))
    context.closePath()
}
  
  render() {
    return(
      <Fragment>
        <canvas ref={'frame'} width={600} height={600} style={{backgroundColor:'#353839', border:'1px solid #A0E6FF'}} />
      </Fragment>
    )
  }
}

export default CalendarFrame;