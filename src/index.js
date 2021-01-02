import 'bootstrap/scss/bootstrap.scss';
import './style.scss';
import soundBoard from 'sound-board';
import $ from 'jquery';
import soundPath from '../json/soundboard-paths.json';

window.onload = (event) => {
  initSound();
  createGroup();
};

function getClearFileName(name = ''){
  const arr = name.split('.')
  return arr[0];
}


function initSound(){
  const data = {};

  for(const soundType in soundPath){
    if(soundPath[soundType].length){
      soundPath[soundType].forEach((soundItem) => {
        const clearName = getClearFileName(soundItem.filename);
        const nameType = soundType + clearName;
        data[nameType] = '.' + soundItem.path;
      });
    }
  }

  soundBoard.loadSounds(data);

  console.log(data);
}

function createGroup(){
  const groups = [];

  for(const soundType in soundPath){
    if(soundPath[soundType].length){

      const btns = [];

      soundPath[soundType].forEach((soundItem) => {
        const clearName = getClearFileName(soundItem.filename);

        let className = 'btn-primary';
        if(clearName.includes('say')) {
          className = 'btn-info';
        } else if(clearName.includes('hurt')) {
          className = 'btn-danger';
        } else if(clearName.includes('hit')) {
          className = 'btn-warning';
        } else if(clearName.includes('death')) {
          className = 'btn-dark';
        } else if(clearName.includes('step')) {
          className = 'btn-success';
        }


        const nameType = soundType + clearName;
        const btn = $(`<button class="btn ${className}">${clearName}</button>`);

        btn.click((e) => {
          e.preventDefault();

          soundBoard.play(nameType);
        })

        btns.push(btn);
      });

      const col = $(`<div class="col"><h3>${soundType}</h3></div>`);
      col.append(btns);
      const group = $(`<div class="row">`);
      group.append(col);
      groups.push(group);
      // groups.push($('<hr />'))
    }
  }

  $('#main').html(groups);
}