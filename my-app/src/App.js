import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';


function App() {

  const Piano = styled.a`
    font-size: 1.2em;
    overflow: hidden;
    display: block;
    width: 42em;
    padding: 0px;
    margin: 0px;
    border: 0px;
    margin-left: 0.5em;

    span {
    color: #808080;
    background-color: #f0f0f0;
    padding: 0.4em;
    margin: 0.1em;
    border: 0.3em double;
    display: inline-block;
    width: 2em;
    height: 2em;
    vertical-align: top;
   }
    span.blank {
    color: #f0f0f0;
    background-color: #fff;
   }
   span.on {
    background-color: #000;
   }
`

var navigator = require('jzz');
navigator.requestMIDIAccess().then(function(webmidi) {
    webmidi.outputs.forEach(function(port) { console.log('MIDI Out:', port.name); });
    webmidi.inputs.forEach(function(port) { console.log('MIDI In:', port.name); });
    navigator.close(); // Required in Node.js.
    // This will close MIDI inputs, otherwise Node.js will wait for MIDI input forever.
  }, function(err) {
    console.log('Cannot start WebMIDI!');
    if (err) console.log(err);
  }
);
//JZZ.synth.Tiny.register('Synth');
var port = navigator.JZZ().openMidiOut().or(function(){alert('Cannot open MIDI port!');});

var midi={65:58,90:59,88:60,68:61,67:62,70:63,86:64,66:65,72:66,78:67,74:68,77:69,75:70,188:71,190:72,186:73,59:73,191:74,222:75};
document.onkeydown=function(e){
 var e=window.event || e;
 var m=midi[e.keyCode];
 if(m){
  var k=document.getElementById(m);
  if(k && k.className!="on"){
   port.send([0x90,m,0x7f]);
   k.className="on";
  }
  return false;
 }
}
document.onkeyup=function(e){
 var e=window.event || e;
 var m=midi[e.keyCode];
 if(m){
  var k=document.getElementById(m);
  if(k && k.className!=""){
   port.send([0x80,m,0]);
   k.className="";
  }
  return false;
 }
}

  return (
    <div className="App">
      <header className="App-header">
          <Piano>
            <span id='58'>A</span><span className='blank'>S</span><span id='61'>D</span><span id='63'>F</span><span className='blank'>G</span><span id='66'>H</span><span id='68'>J</span><span id='70'>K</span><span className='blank'>L</span><span id='73'>:<br/>;</span><span id='75'>"<br/>'</span>
        </Piano>
        <Piano>
            <span id='59'>Z</span><span id='60'>X</span><span id='62'>C</span><span id='64'>V</span><span id='65'>B</span><span id='67'>N</span><span id='69'>M</span><span id='71'><br/>,</span><span id='72'><br/>.</span><span id='74'>?<br/>/</span>
        </Piano>

      </header>
    </div>
  );
}

export default App;


