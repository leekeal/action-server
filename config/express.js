var express = require('express');
var path = require('path');

module.exports = function (app, config,sessionStore) {
app.set('port', process.env.PORT || 9000);
// app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.set('views', config.root + '/public')

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session(
{        
	key: 'sid',
	secret: "action",
	store:sessionStore
}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(config.root + '/public'));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

}
