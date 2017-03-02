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
			React.createElement("div",{},
				React.createElement("div",{id:"status",onClick:this.handClick},this.props.status),
				React.createElement("a",{href:"registered"},"注册"),
				React.createElement("a",{href:"login"},"登录"),
				React.createElement("a",{href:"form"},"头像设置"),
				React.createElement("a",{href:"cancelLogin"},"退出登录"),
				React.createElement("button",{type:"button"},"弹框")
			)
		)
	}
})


module.exports = function(jsonData){
	return React.renderToStaticMarkup(
		React.createElement(Content,{status:jsonData})
	);
}