
if(!window.Desmos) window.Desmos = {};
window.Desmos.config = {};
if(!window.console) window.console = {};
if(!window.console.log) window.console.log = function(){};

if(window.location.protocol === 'file:')
 window.history.pushState = function(){};
