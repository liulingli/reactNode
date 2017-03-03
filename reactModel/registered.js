var React = require('react');
var Content = React.createClass({
			render:function(){
				return (
					React.createElement("div",{className:"homeBox"},
						React.createElement("form",{action:"process_registered",method:"POST"},
							React.createElement("label",{className:"login_name"},
								React.createElement("span",{},"用户名："),
								React.createElement("input",{type:"text",name:"name"},null)
							),
							React.createElement("label",{className:"login_password"},
								React.createElement("span",{},"密码："),
								React.createElement("input",{type:"password",name:"password"},null)
							),
							React.createElement("button",{className:"login_btn"},"注册")
						)
					)
				)
			}
		})
module.exports = function(){
	return React.renderToStaticMarkup(
				React.createElement(Content)
			)
}