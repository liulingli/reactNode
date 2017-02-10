var React = require('react');
var Content = React.createClass({
			render:function(){
				return (
					React.createElement("div",{},
						React.createElement("div",{id:"status",onClick:this.handClick},this.props.status),
						React.createElement("a",{href:"registered"},"注册"),
						React.createElement("a",{href:"login"},"登录"),
						React.createElement("a",{href:"cancelLogin"},"退出登录"),
						React.createElement("button",{type:"button"},"弹框")
					)
				)
			}
		})

module.exports = function(jsonData){
	var html = jsonData.status?"已登录":"未登录";
	return React.renderToString(
		React.createElement("html",{},
			React.createElement("head",{},null),
			React.createElement("body",{},
				React.createElement(Content,{status:html})
			)
		)
	);
}