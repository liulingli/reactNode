var React = require('react');
var Content = React.createClass({
			render:function(){
				return (
					React.createElement("form",{action:"process_login",method:"POST"},
						React.createElement("label",{},
							React.createElement("span",{},"用户名："),
							React.createElement("input",{type:"text",name:"name"},null)
						),
						React.createElement("label",{},
							React.createElement("span",{},"密码："),
							React.createElement("input",{type:"password",name:"password"},null)
						),
						React.createElement("button",{},"登录")
					)
				)
			}
		})

module.exports = function(){
	return React.renderToString(
		React.createElement("html",{},
			React.createElement("head",{},null),
			React.createElement("body",{},
				React.createElement(Content)
			)
		)
	);
}