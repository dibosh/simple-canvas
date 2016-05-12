'use strict'

class Item {
  constructor( el ) {
    this.x = 10;
    this.y = 10;
    this.dragX = 0;
    this.dragY = 0;
    this.z = 1;
    this.selected = false;

    // wrapper for item
    var div = document.createElement( 'div' );
    div.classList.add( 'item' );
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.appendChild( el )

    this.el = div;
    this.state = {
      select: new Rx.Subject(),
      // mousedown: Rx.Observable.fromEvent( this.el, 'mousedown' );
      // mouseup: Rx.Observable.fromEvent( this.el, 'mouseup' );
    }
  }

  mousedown( mousedown$ ) {
    if ( mousedown$.target.parentNode.id == this.el.id ) {
      this.el.classList.add( 'selected' );
      this.selected = true;
      this.dragX = mousedown$.pageX;
      this.dragY = mousedown$.pageY;
      this.state.select.onNext( true );

    } else {

      this.el.classList.remove( 'selected' );
      this.selected = false;
      this.state.select.onNext( false );
    }
  }

  mouseup( mouseup$ ) {
    // this.dragX = 0;
    // this.dragY = 0;
  }

  mousemove( drag$ ) {
    if ( drag$.target.parentNode.id == this.el.id ) {
      // let deltaX = drag$.pageX - this.dragX;
      // let deltaY = drag$.pageY - this.dragY;

      this.el.style.left = ( this.x + drag$.left ) + 'px';
      this.el.style.top = ( this.y + drag$.top ) + 'px';
      // this.update();
    }
  }

  update() {
    this.el.style.left = this.x + 'px';
    this.el.style.top = this.y + 'px';
  }
}

class Img extends Item {
  constructor( el ) {
    // run super class contructor
    super( el );
  }
}

class Txt extends Item {
  constructor() {
    var div = document.createElement( 'div' );
    div.contentEditable = false;
    div.innerHTML = "write something here";
    // run super class contructor
    super( div );

  }

  edit() {
    this.el.contentEditable = true;
  }

  quitEdit() {
    this.el.contentEditable = false;
  }
}