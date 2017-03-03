var React = require('react');
var Content = React.createClass({
			render:function(){
				return (
					React.createElement("div",{className:"avatarBox"},
						React.createElement("form",{action:"form_file",method:"POST",encType:"multipart/form-data"},
							React.createElement("div",{className:"imgBox"},
								React.createElement("img",{src:this.props.imgSrc}),
								React.createElement("span",{},""),
							),
							React.createElement("label",{className:"uploadBox"},
								React.createElement("span",{},"头像："),
								React.createElement("input",{type:"file",name:"avatar"},null),
								React.createElement("button",{type:"button"},"上传头像")
							),
							React.createElement("button",{className:"avatarSubmit"},"提交")
						)
					)
				)
			}
		})

module.exports = function(avatar){
	return React.renderToStaticMarkup(
				React.createElement(Content,{imgSrc:avatar})
			)
}
