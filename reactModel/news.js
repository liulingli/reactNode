var React = require('react');
var Content = React.createClass({
			render:function(){
				return (
					React.createElement("div",{className:"avatarBox"},
						React.createElement("ul",{className:"news_list"},
							this.props.newsList.map(function(todo,index){
								return (
									React.createElement("li",{key:index},
										React.createElement("div",{className:"news_avatar"},
											React.createElement("img",{src:todo.avatar},null)
										),
										React.createElement("div",{className:"news_info"},
											React.createElement("span",{className:"news_name"},todo.first_name),
											React.createElement("span",{className:"news_id"},todo.id)
										),
										React.createElement("div",{className:"news_verification"},todo.value)
									)
								)
							})
						)
					)
				)
			}
		})

module.exports = function(list){
	return React.renderToStaticMarkup(
				React.createElement(Content,{newsList:list})
			)
}
