'use strict';

import "./control-panel.styl"

var React = require('react');
var update = require('react-addons-update');

Array.prototype.clone = function(){
    return JSON.parse(JSON.stringify(this));
};

Array.prototype.move = function (oldIndex, newIndex) {

    if (newIndex >= this.length) {

        var k = newIndex - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }

    }

    this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);

    return this; // for testing purposes
};

var ControlPanelComponent = React.createClass({

    getInitialProps: function(){
      return {
          items: [],
          onChange: function(){}
      }
    },

    createItem: function(e){
        this.props.items.push({
            id: this.props.items[this.props.items.length - 1] ? this.props.items[this.props.items.length - 1].id + 1 : 0,
            title: 'Default title'
        });
        this.props.onChange.call(this, {items: this.props.items})
    },

    removeItem: function(e){

        this.props.onChange.call(this, {
            items: this.props.items.filter(function(item){
                return !item.active
            })
        });

    },

    copyItems: function(){

        var clones = this.props.items.filter(function(item){
            return item.active;
        });

        this.props.onChange.call(this, {
            items: update(this.props.items, {
                $push: clones.map(function(item, index){
                    var clone = JSON.parse(JSON.stringify(item));
                    clone.id = this.props.items[this.props.items.length - 1].id + 1 + index;
                    clone.active = false;
                    return clone;
                }, this)
            })
        })
    },

    moveItems: function(direction){

        this.props.items.clone().map(function(item, index){

            if(direction === 'up' && item.active && index-1 >= 0){
                this.props.items.move(index, index - 1)
            }

            if(direction === 'down' && item.active && index + 1 < this.props.items.length){
                this.props.items.move(index, index + 1)
            }

        }, this);

        return this.props.items;
    },

    moveUp: function(){

        this.props.onChange.call(this, {
            items: this.moveItems('up')
        })
    },

    moveDown: function(){

        this.props.onChange.call(this, {
            items: this.moveItems('down')
        })
    },

    render: function(){
        return (
            <div className="control-panel">
                <button className="glyphicon glyphicon-plus" onClick={this.createItem}></button>
                <button className="glyphicon glyphicon-trash" onClick={this.removeItem}></button>
                <button className="glyphicon glyphicon-copy" onClick={this.copyItems}></button>
                <button className="glyphicon glyphicon-menu-up" onClick={this.moveUp}></button>
                <button className="glyphicon glyphicon-menu-down" onClick={this.moveDown}></button>
            </div>
        )
    }

});

module.exports = ControlPanelComponent;