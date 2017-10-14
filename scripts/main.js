var modules = [];
function register(name, module) {
	modules.push(module());
}

function unregister(name) {
	var index = modules.findIndex(function(searchModule){
		return searchModule.name == name;
	});
	if (index >= 0) {
		var module = modules[index];
		module.kill();
		modules.splice(index, 1);
	}
}

var broker = jQuery({});

var ticker = (function() {

	var timer = new Timer(1000);
	var counter = 0;

	timer.onTick = function() {
		broker.trigger( 'app:ticker', {counter: counter} );
		counter += 1;
	};
	
	return {
		start: timer.start.bind(timer),
		stop: timer.stop.bind(timer)
	};

})();

function onDOMReady() {

	var $appLogger = $('#app-logger');
	broker.on('app:log', function(event, data) {
		//$appLogger.append(data.counter + '<br>');
	});

}

jQuery(function($) {

	onDOMReady();

	// App
		
	$('button[data-action="app-ready"]').on('click', function() {
		broker.trigger('app:ready', 'App is ready');
	});

	// Ticker
		
	$('button[data-action="start-timer"]').on('click', function() {
		ticker.start();
	});

	$('button[data-action="stop-timer"]').on('click', function() {
		ticker.stop();
	});

	// Plugins
	
	$('button[data-action^="register:"]').on('click', function() {
		var pluginName = $(this).data('action').substr('register:'.length);

		var $target;
		if (pluginName == 'plugin-1') {
			$target = $('#plugin-1-slot-1');
		}
		if (pluginName == 'plugin-2') {
			$target = $('#plugin-2-slot-1');
		}

		var url = 'scripts/' + pluginName + '.js';
		$.getScript(url, function() {
			var module = modules.find(function(searchModule){
				return searchModule.name == pluginName;
			});
			if (module) {
				module.init(broker, $target);
			}
			
		});
		
	});
	
	$('button[data-action^="unregister:"]').on('click', function() {
		var pluginName = $(this).data('action').substr('unregister:'.length);
		unregister( pluginName );
	});

});
