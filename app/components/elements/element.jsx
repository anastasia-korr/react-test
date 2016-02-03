'use strict';

import "./element.styl"

var React = require('react');
var classNames = require('classnames');

var ColumnComponent = React.createClass({

    getInitialProps: function(){
      return {
          onActive: function(){},
          onChange: function(){}
      }
    },

    getInitialState: function(){
      return {
          active: false,
          id: this.props.item.id,
          title: this.props.item.title
      }
    },

    onClick: function(e){

        this.setState({
            active: !this.state.active
        }, function(){
            this.props.onChange.call(this, this.state)
        });



    },

    onClickTitle: function(e){
      e.stopPropagation()
    },

    onInputTitle: function(e){
        this.setState({
            title: this.refs.title.innerText
        }, this.props.onChange.call(this, this.state));
    },

    render: function(){

        var elementClasses = classNames({
            element: true,
            active: this.state.active
        });

        return (
            <div className={elementClasses} onClick={this.onClick}>
                <h4 ref="title" contentEditable onInput={this.onInputTitle} onClick={this.onClickTitle} dangerouslySetInnerHTML={{__html: this.state.title}}></h4>
            </div>)
    }
});

module.exports = ColumnComponent;