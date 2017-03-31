
import _ from 'lodash'
import $ from 'jquery'
import own from './example'

function component() {
  var element = $('<div></div>')

  element.html(_.join(['hello','webpack'],' '))

  return element.get(0)  
}

document.body.appendChild(component())
console.log(own)
console.log(own())

