const socialBtn = document.getElementById('social');
const contactBtn = document.getElementById('contact');
const hexagonBtn = document.getElementById('hexagon');



const displaySocialButtons = () => {

  let social = document.getElementById('social');
  let facebook = document.getElementById('facebook');
  let internet = document.getElementById('internet');
  let linkedin = document.getElementById('linkedin');

  if (social.className === 'button') {

    facebook.className += ' facebook';
    internet.className += ' internet';
    linkedin.className += ' linkedin';
    social.className += ' clicked';

  }

  else {
    facebook.className = 'button';
    internet.className = 'button';
    linkedin.className = 'button';
    social.className = 'button';
  }

}

const displayContactButtons = () => {
  let mail = document.getElementById('mail');
  let call = document.getElementById('call');

  if (mail.className === 'contactButton contactButton--white') {
    mail.className += ' mail';
    call.className += ' call';
  }
  else {
    mail.className = 'contactButton contactButton--white';
    call.className = 'contactButton contactButton--white';
  }

}

const flip = () => {
  let hexagonBtn = document.getElementById('hexagon');
  let color = document.getElementById('hex-color');
  if (hexagonBtn.className === 'hex-container'){
    hexagonBtn.className += ' flip';
    color.className += ' hex-color--white'
  }
  else {
    hexagonBtn.className = 'hex-container';
    color.className = 'hexagon-in2 hex-color';
  }
}

socialBtn.onclick = displaySocialButtons;
contactBtn.onclick = displayContactButtons;
hexagonBtn.onclick = flip;
