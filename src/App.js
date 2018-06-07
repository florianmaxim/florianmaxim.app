import React, { Component } from 'react';

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import './App.css';

import * as config from './config.json';

import gold from './Gold.json';
import items from './Default.json';
import balls from './Balls.json';

const info = [
  "I'm Flo and I make beautiful apps.",
  "My apps are simple and smart. Cross-platform and secure.",
  "I am a full stack frontend and backend developer.",
  "I'm Flo and I make beautiful apps.",
  "My apps are simple and smart. Hybrid and secure.",
  "I am a full stack frontend and backend developer.",
  "I'm Flo and I make beautiful apps.",
  "My apps are simple and smart. Hybrid and secure.",
  "I am a full stack frontend and backend developer.",
]

export default class App extends Component {

  constructor(props){

    super(props);

    this.state = {

      _started: false,

      _mounted: false,
      _loading: false,
      _allLoaded: false,

      _info: true,

      _details: true,

      _signature: false,

      viewport: {
        top: 0,
        height: 0
      },

      scrollDirection: 'down',

      length: 0,

      itemPointer: 0,
      items: items.items,
      item: items.items[0],

      modes: [
        "info",
        "details",
        "off"
      ],
      modePointer: 0
    }

  }


  componentWillMount(){

    this.updateViewport();

  }

  componentDidMount(){

    window.addEventListener('scroll', (event) => {

      this.updateViewport();

      let _itemPointer  = (this.state.viewport.top/this.state.viewport.height).toFixed(0);

          _itemPointer = _itemPointer>0&&_itemPointer<=this.state.items.length?_itemPointer:0;

          _itemPointer = _itemPointer<this.state.items.length?_itemPointer:this.state.items.length-1;


      let _item     = this.state.items[_itemPointer];

      this.setState({

        _started: this.state.viewport.top>10?true:false,

        itemPointer: _itemPointer,
        item: _item,

      }, () => {});

    })

    window.addEventListener('resize', (event) => {
      this.updateViewport();
    })
  }


  updateViewport() {

   this.setState({
     scrollDirection: this.state.viewport.top>window.pageYOffset?'up':'down',

      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight
      },

    });

  }

  handleOnLoad(event, index){
    event.preventDefault();

    let _items = this.state.items;
        //Set loaded flag
        _items[index][1] = true;

    let _length = index<this.state.items.length-1?this.state.length+window.innerHeight:this.state.items.length;

    let _allLoaded = index===this.state.items.length-1?true:this.state._allLoaded;

    this.setState({

      items: _items,

      length: _length,

     _loading: false,
     _allLoaded: _allLoaded
    })
  }

  handleMode(event){

    event.preventDefault();

    this.setState({

      modePointer:this.state.modePointer<this.state.modes.length-1?this.state.modePointer+1:0

    }, () => {

      switch(this.state.modes[this.state.modePointer]){

        case "off":

          this.setState({
            _details: false
          })

        break;
        case "details":

          this.setState({
            _details: true,
            _info: false
          })

        break;
        case "info":

          this.setState({
            _details: true,
            _info: true
          })

        break;
      }

    })
  }


  setItems(){
    return(

      <div>

      <div></div>

      {
      this.state.items.map((item, index) => {

        const inView   = this.state.viewport.top>=(index*this.state.viewport.height)-this.state.viewport.height*.75;
        const isLoaded = this.state.items[index][1];

        if(inView){
            // console.log('item '+index+' is in view');

            if(isLoaded){
              // console.log('loaded item '+index);
              return(
                  <div key={index} className="item">

                      <img style={{opacity:'1'}} className="image" alt={item[0]} src={item[0]} />

                      <div className="loader" style={{opacity:'0'}} />

                  </div>
                )
            }else{
              // console.log('loading item '+index);
              this.state._loading=true; //TODO This is not pretty
              return(
                  <div key={index} className="item">

                      <img style={{opacity:'0'}} className="image" alt={item[0]} src={item[0]}  onLoad={(event)=>{this.handleOnLoad(event,index)}}/>

                      <div className="loader"  style={{opacity:'1'}} />

                  </div>
              );
            }

        }else{
          if(isLoaded){
            return(
                <div key={index} className="item">
                  <img className="image" alt={item[0]} src={item[0]} style={{opacity:'0'}}/>
                </div>
              )
          }
        }
      }) }

        <div className="item" style={{
          fontFamily: 'Song Myung',
          fontSize: '15pt',
          color: 'red',
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'center',
          flexDirection: 'column'
        }}>

        Impress<br/>
        <br/>
        Florian Maxim<br/>
        Sonnenallee 102<br/>
        12045 Berlin<br/>
        <br/>
        hello@florianmaxim.com
        </div>
      </div>);
  }

  setLogo(){

    return <div>
    <div
    style={{
      display: config.arrows?'flex':'none',
      position: 'fixed',
      bottom: '5vh',
      right: '5vw',
      zIndex: '999',
      width: '50px',
      height: '50px',
      border: '5px solid yellow',
      borderLeftWidth: '0px',
      borderTopWidth: '0px',
      cursor: 'pointer',
      borderColor: this.state._details?'yellow':'#e5e5e5',
      //borderRadius: this.state.modePointer===0?'100%':'0'
    }}
    onClick={(event)=>{
      scroll.scrollMore(this.state.viewport.height/2);
    }} />
    <div className="logo"
    style={{
      background: this.state._info?'transparent':'transparent',
      borderColor: this.state._details?'red':'#e5e5e5',
      borderRadius: this.state._info?'100%':'0',
    }}
    onClick={(event)=>{this.handleMode(event)}}>{}</div>
    <div
    style={{
      display: config.arrows?'flex':'none',
      position: 'fixed',
      bottom: '5vh',
      left: '5vh',
      zIndex: '999',
      width: '50px',
      height: '50px',
      borderColor: 'blue',
      borderStyle: 'solid',
      borderLeftWidth: '5px',
      borderTopWidth: '5px',
      borderRightWidth: '0px',
      borderBottomWidth: '0px',
      borderColor: this.state._details?'blue':'#e5e5e5',
      cursor: 'pointer'
      //borderRadius: this.state.modePointer===0?'100%':'0'
    }}
    onClick={(event)=>{
      scroll.scrollToTop();
    }} />
    </div>
  }

  setInfo(){
      return (
        <div>
          {
            info[this.state.itemPointer]
          }
        </div>
      )
  }


  setDetails(){
    return(

      <div>

      <div style={{
        position: 'fixed',
        left: '21px',
        top: '66px',
        fontFamily: 'Roboto',
        fontSize: '12px',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: '2',
        display: config.icon?'flex':'none'
      }}>

        {this.state.item[1]}

      </div>

        <div style={{
          position: 'fixed',
          right: '25px',
          top: '25px',
          zIndex: '99',
          display: config.debug?'flex':'none'
        }}>
          {this.state.modes[this.state.modePointer]}({this.state.modePointer})
        </div>

        <div
          onClick={() => {}}
          style={{
            zIndex: '9999',
            position: 'fixed',
            top: '0px',
            left: '0vw',
            width: '75px',
            height: '80px',
            background: 'rgba(255,255,255,.85)',
            border: '0px solid black',
            cursor: 'pointer',
            transition: '.125s all',
            opacity: this.state.modes[this.state.modePointer]!=="info"?'0':'1'
          }}/>

        <a href={this.state.item[5]}>
        <img
          onClick={() => {}}
          src={this!==undefined&&this.state!==undefined&&this.state.item!==undefined?this.state.item[2]:''}
          style={{
            display: config.icon?'flex':'none',
            zIndex: '10',
            position: 'fixed',
            top: '0px',
            left: '0vw',
            transform: 'translate3d(25%,0,0)',
            width: '50px',
            height: '50px',
            marginTop: '12.5px',
            border: '0px solid black',
            cursor: 'pointer',
            transition: '.125s all'
          }}/>
        </a>
        <div
          onClick={() => {}}
          className="details"
          style={{
            position: 'fixed',
            left: '0',
            height: this.state._details?'100vh':'10px',
            borderBottom: '0px solid blue'
          }}
        >
          <div
          className="details-text"
          style={{
            opacity: this.state._details?'1':'0',
            color: "red"
          }}>
            {this.state._info?this.setInfo():this.state.item[3]}
          </div>
        </div>

      </div>

    )
  }


  render() {
    return (
      <div className="App" style={{height: this.state.length+'px'}}>

        {this.setDetails()}
        {this.setItems()}
        {this.setLogo()}

      </div>
    );
  }
}
