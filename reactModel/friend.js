var React = require('react');

var Content = React.createClass({
	render:function(){
		return (
			React.createElement("div",{className:"friendBox"},
				React.createElement("div",{className:"friendTop"},
					React.createElement("a",{href:"news"},"消息中心"),
					React.createElement("a",{href:"addFriend"},"添加好友")
				),
				React.createElement("ul",{className:"friendList"},
					this.props.friendList.map(function(todo,index){
						return (
							React.createElement("li",{key:index},
								React.createElement("div",{className:"friend_avatarBox"},
									React.createElement("img",{src:todo.avatar},null)
								),
								React.createElement("div",{className:"friend_infoBox"},
									React.createElement("div",{className:"friend_name"},todo.first_name),
									React.createElement("span",{className:"friend_id"},todo.id)
								),
								React.createElement("button",{className:"friend_delete"},"删除好友")
							)
						)
					})
				)
			)
		)
	}
})


module.exports = function(jsonData){
	return React.renderToStaticMarkup(
		React.createElement(Content,{friendList:jsonData})
	);
}