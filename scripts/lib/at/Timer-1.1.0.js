/*
 * @author Ambrosius Topor
 * @date 2012-Dec-12, 2016-Dec-20
 * @version 1.1.0
 *
 */

(function( sc ) {

	function Timer( duration, repeat ) {
		this.duration = duration;
		this.repeat = ( typeof repeat != "undefined" ) ? repeat : 0;
		this._count = 0;
		this._interval = null;
	}

	(function() {
	
		this.start = function() {
			if ( this._interval ) {
				return ;
			}
			var _this = this;
			this._onTick();
			this._interval = window.setInterval(
				function() { _this._onTick(); },
				this.duration
			);
		};
		
		this.stop = function() {
			if ( this._interval ) {
				window.clearInterval( this._interval );
				this._interval = null;
			}
		};
		
		this.reset = function() {
			this._count = 0;
		};
		
		this._onTick = function() {
			this._count++;
			if ( ( this.repeat == 0 ) || ( this._count <= this.repeat ) ) {
				if ( typeof this.onTick == "function" ) this.onTick( { target: this } );
			}
			if ( ( this.repeat != 0 ) && ( this._count >= this.repeat ) ) {
				this.stop();
				if ( typeof this.onFinish == "function" ) this.onFinish( { target:this } );
			}
		};
	
	}).call( Timer.prototype );

	sc.Timer = Timer;

})( window );