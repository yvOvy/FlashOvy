var EventDispatcher = Class.extend({
	init: function(){
		this._listeners
		this._scopes
		
	},
	addEventListener:function ($type, $listener, $scope ) {

		if ( this._listeners === undefined ) this._listeners = {};
		if ( this._scopes === undefined ) this._scopes = {};

		var listeners = this._listeners;
		var scopes = this._scopes;
		
		if ( listeners[ $type ] === undefined ) {
			listeners[ $type ] = [];	
		}
		if ( scopes[ $type ] === undefined ) {
			scopes[ $type ] = [];
		}
		if ( listeners[ $type ].indexOf( $listener ) === - 1 ) {
			listeners[ $type ].push( $listener );
			scopes[ $type ].push( $scope );
		}
	},
	hasEventListener: function ( $type, $listener ,$scope) {
		if ( this._listeners === undefined ) return false;
		var listeners = this._listeners;
		
		if ( listeners[ $type ] !== undefined && listeners[ $type ].indexOf( $listener ) !== - 1 ) {
			return true;
		}
		return false;
	},
	removeEventListener:function ( $type, $listener ,$scope) {

		if ( this._listeners === undefined ) return;

		var listenerArray = this._listeners[ $type ];
		var scopesArray = this._scopes[ $type ];
		
		if ( listenerArray !== undefined ) {

			var index = listenerArray.indexOf( $listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );
				scopesArray.splice( index, 1 );

			}

		}

	},
	dispatchEvent :function( $event ) {
			
		if ( this._listeners === undefined ) return;

		var listenerArray = this._listeners[ $event.type ];
		var scopesArray = this._scopes[ $event.type ];

		if ( listenerArray !== undefined ) {
			$event.target = this;
			var array = [];
			var length = listenerArray.length;
			for ( var i = 0; i < listenerArray.length; i ++ ) {
				if(listenerArray[ i ] != undefined){
					listenerArray[ i ].call(scopesArray[i], $event );
				}else{
					trace("dispatchEvent - undefined")
				}
			}
		}
	}
});

