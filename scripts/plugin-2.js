register('plugin-2', function() {

	var broker;
	var $container;
	var count = 0;

	function logTicker(event, data) {
		console.log('plugin-2: ticker: ', data);
		count = data.counter;
		render();
	}
	
	function init(_broker, $_container) {	
		console.log('plugin-2: init');
		broker = _broker;
		$container = $_container;
		//broker.one('app:ready', function() {
		//	console.log('plugin-2: app ready');
			render();
		//});
		broker.on('app:ticker', logTicker);
	}
	
	function kill() {
		broker.off('app:ticker', logTicker);
		$container.html('');
		console.log('plugin-2 killed');
	}
	
	function render() {
		$container.html('<h3>plugin 2<br>'+count+'</h3>');
	}

	return {
		name: 'plugin-2',
		init: init,
		kill: kill
	};

});