'use strict';

import './section.styl'

var React = require('react');
var ControlPanelComponent = require('../controls/control-panel');
var ColumnComponent = require('../elements/element');
var update = require('react-addons-update');

var SectionComponent = React.createClass({
    displayName: "SectionComponent",

    getInitialState: function(){
      return {
          items: [{
              id: 0,
              title: 'Some title 1'
          },{
              id: 1,
              title: 'Some title 2'
          },{
              id: 2,
              title: 'Some title 3'
          }]
      }
    },

    onStateChange: function(state){


        this.setState(state)
    },

    change: function(item){
        this.setState({
            items: this.state.items.map(function(i){
                if(i.id == item.id){
                    i = item
                }
                return i
            })
        })
    },

    render: function(){

        var createItem = function(item){
            return <ColumnComponent key={item.id} item={item} onChange={this.change}/>
        };

        return (
            <section className="section">
                <header className="header">
                    <h2>Section</h2>
                    <ControlPanelComponent items={this.state.items} onChange={this.onStateChange}/>
                </header>
                <div className="section-body">
                    <div className="element-collection">
                        {this.state.items.map(createItem, this)}
                    </div>
                </div>
            </section>
        )
    }
});

module.exports = SectionComponent;