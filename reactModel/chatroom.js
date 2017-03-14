var React = require('react');

var Content = React.createClass({
	getInitialState:function(){
		return {
			text:"",
			child:[]
		}
	},
	render:function(){
		return (
			React.createElement("div",{className:"chatroomBox"},
				React.createElement("div",{id:"status",className:"chatroomTop"},
					React.createElement("ul",{},null)
				),
				React.createElement("div",{className:"chatroomBottom"},
					React.createElement("textarea",{className:"textContent",defaultValue:this.state.text}),
					React.createElement("button",{type:"button"},"提交")
				)
			)
		)
	}
})

module.exports = function(jsonData){
	return React.renderToStaticMarkup(
		React.createElement(Content)
	);
}