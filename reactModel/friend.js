var React = require('react');

var Content = React.createClass({
	render:function(){
		return (
			React.createElement("div",{className:"friendBox"},
				React.createElement("div",{className:"friendTop"},
					React.createElement("a",{href:"javascript:;"},"消息中心"),
					React.createElement("a",{href:"addFriend"},"添加好友")
				),
				React.createElement("ul",{className:"friendList"},
					React.createElement("li",{},"列表")
				)
			)
		)
	}
})


module.exports = function(jsonData){
	return React.renderToStaticMarkup(
		React.createElement(Content,{status:jsonData})
	);
}