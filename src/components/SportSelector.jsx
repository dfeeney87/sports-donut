import React from 'react';
import {schedules} from '../schedules';

export const SportSelector = ({changeSportCallback, context, instantiateCanvas, radius}) => {
  async function clearAndDraw(sport) {
    await instantiateCanvas();
    return changeSportCallback(radius, sport);
  }
  const {baseball, basketball, football, hockey} = schedules;
  
  return (
    <div className={'button-container'}>
      
      <div onClick={async () => {instantiateCanvas()}} className={'button bad'}>CLEAR</div>
      <div onClick={()=>clearAndDraw(baseball)} className={'button'}>MLB</div>
      <div onClick={()=>clearAndDraw(football)} className={'button'}>NFL</div>
      <div onClick={()=>clearAndDraw(basketball)} className={'button'}>NBA</div>
      <div onClick={()=>clearAndDraw(hockey)}className={'button'}>NHL</div>
    </div>
  );
}

export default SportSelector;