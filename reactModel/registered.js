var React = require('react');
var Content = React.createClass({
			render:function(){
				return (
					React.createElement("form",{action:"process_registered",method:"POST"},
						React.createElement("label",{},
							React.createElement("span",{},"用户名："),
							React.createElement("input",{type:"text",name:"name"},null)
						),
						React.createElement("label",{},
							React.createElement("span",{},"密码："),
							React.createElement("input",{type:"password",name:"password"},null)
						),
						React.createElement("button",{},"提交")
					)
				)
			}
		})
module.exports = function(){
	return React.renderToStaticMarkup(
				React.createElement(Content)
			)
}