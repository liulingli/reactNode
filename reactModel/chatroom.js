var React = require('react');

var Content = React.createClass({
	render:function(){
		return (
			React.createElement("div",{className:"chatroomBox"},
				React.createElement("div",{id:"status",className:"home_status"},
					React.createElement("ul",{},
						React.createElement("li",{},"内容")
					)
				),
				React.createElement("div",{className:"chatroomBottom"},
					React.createElement("textarea",{className:"textContent"},null),
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