package controllers

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// this.innerHTML = \'<h1>Hello Marco</h1><button onClick="() => console.log(\'mööp\');">post</button>\';

// var webComponent string = fmt.Sprint(`class HelloMarcoComponent extends HTMLElement {
// 	greet() {
// 		console.log('hello on the other side');
// 	}

//   	connectedCallback() {
// 	  console.log('console marco greeter');
// 	  this.innerHTML = '<button onclick="greet()">click me</button>';
// 	}
//   }

//   customElements.define('hello-marco', HelloMarcoComponent);`)

func LoadExtension(c *gin.Context) {
	filePath := "lit-element.js"

	content, err := os.ReadFile(filePath)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to load file")
		return
	}

	webComponent := string(content)

	c.Header("Content-Type", "text/javascript")
	c.String(http.StatusOK, webComponent)
}
