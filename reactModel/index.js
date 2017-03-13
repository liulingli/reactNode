var React = require('react');

var For = React.createClass({
	generate:function(todo,index){
		return (
			React.createElement("li",{className:"li"+index},todo)
		)
	},
	render:function(){
		return (
			React.createElement("ul",{},
				React.Children.map(this.props.child,this.generate)
			)
		)
	}
})

For.propTypes = {
	name:React.PropTypes.array
}

var Content = React.createClass({
	render:function(){
		return (
			React.createElement("div",{className:"homeBox"},
				React.createElement("div",{id:"status",className:"home_status",onClick:this.handClick},this.props.status),
				React.createElement("a",{href:"registered",className:"home_registered"},"注册"),
				React.createElement("a",{href:"login",className:"home_login"},"登录"),
				React.createElement("a",{href:"form",className:"home_avatar"},"头像设置"),
				React.createElement("a",{href:"chatroom",className:"home_avatar"},"聊天室"),
				React.createElement("a",{href:"cancelLogin",className:"outLogin"},"退出登录")
			)
		)
	}
})


module.exports = function(jsonData){
	return React.renderToStaticMarkup(
		React.createElement(Content,{status:jsonData})
	);
}