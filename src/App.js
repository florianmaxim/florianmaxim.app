import React, { Component } from 'react';

import './App.css';

import gold from './Gold.json';
import items from './Default.json';
import balls from './Balls.json';

let ROUTES = [
  "default",
  "gold",
  "ball",
  "balls",
]

let ITEMS = [
  items,
  gold,
  balls,
  balls,
]

let DEFAULT = {
  signature: 'mf',
  info: [
    '',
    'I am a virtual space developer, walking on the blockchain.',
    'hello@maximflorian.com',
    '0049 01590 100 50 85',
    '0x5c5736CC67D0a2F84a0b77DB1fE4A6579BbeE78A',
  ]
}

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {

      _mounted: false,
      _loading: false,
      _allLoaded: false,

      _signature: false,

      viewport: {
        top: 0,
        height: 0
      },

      scrollDirection: 'down',

      length: 0,


      logo: DEFAULT.logo,

      itemPointer: 0,

      items: items.items,

      item: items.items[0],

      info: DEFAULT.info,
      infoPointer: 0
    }
  }

  componentWillMount(){

    this.updateViewport();

  }

  componentDidMount(){

    let _index = ROUTES.indexOf(this.props.match.params.id);
    let _items = _index!==-1?ITEMS[_index].items:items.items;

    this.setState({
      items: _items,
      //Once in a lifetime set the initial window height
      length: !this.state._mounted?window.innerHeight:this.state.length,
      _mounted: true
    })

    window.addEventListener('scroll', (event) => {
      this.updateViewport();

      let _itemPointer  = (this.state.viewport.top/this.state.viewport.height).toFixed(0);
      let _item     = this.state.items[_itemPointer];

      this.setState({
        itemPointer: _itemPointer,
        item: _item,
      });

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

  setItems(){
    return(
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
      })
    );
  }

  setLogo(){
    return <div className="logo" style={{opacity: this.state._loading?'0':'1'}} onClick={(event)=>{this.handleInfo(event)}}>{}</div>
  }

  setSig(){
    return <div className="signature" style={{opacity: this.state._signature?'1':'0'}}>{DEFAULT.signature}</div>
  }

  setInfo(){
    return <div className="info">{DEFAULT.info[this.state.infoPointer]}</div>
  }

  handleInfo(event){
    event.preventDefault();
    this.setState({
      infoPointer: this.state.infoPointer<DEFAULT.info.length-1?this.state.infoPointer+1:0
    })
  }

  render() {
    return (
      <div className="App" style={{height: this.state.length+'px'}}>
        {this.setSig()}
        {this.setLogo()}
        {this.setItems()}
        {this.setInfo()}
      </div>
    );
  }
}
