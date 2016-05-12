'use strict'

class Canvas {
  constructor( el ) {
    this.el = el;
    this.items = {};
    this.item_count = 0;
    this.selected_item = {};
  }

  add( item ) {
    item.el.id = `item_${++this.item_count}`;
    this.el.appendChild( item.el );
    this.items[item.el.id] = item;

    item.state.select.subscribe( select => {
      if ( select ) {
        this.select( item );
      } else {
        this.unselect( item );
      }
    })
  }

  delete( item ) {
    this.el.removeChild( item.el );
    delete this.items[item.id];
  }

  select( item ) {
    this.selected_item[item.el.id] = item;
  }

  unselect( item ) {
    delete this.selected_item[item.el.id];
  }

  keydown( keydown$ ) {
    if ( !isEmpty( this.selected_item ) ) {
      keydown$.preventDefault();
      // prevent default behavior
      let key = keydown$.charCode || keydown$.keyCode || keydown$.which;
      if ( key == 8 ) {
        for ( let key in this.selected_item ) {
          this.delete( this.selected_item[key] );
        }
        // clear selected items
        this.selected_item = {};
      }
    }
  }
}