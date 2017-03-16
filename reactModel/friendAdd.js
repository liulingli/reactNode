var React = require('react');

var Content = React.createClass({
	render:function(){
		return (
			React.createElement("div",{className:"friendBox"},
				React.createElement("div",{className:"friendTop"},
					React.createElement("input",{},null),
					React.createElement("button",{type:"button",id:"friend_find"},"查找好友")
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