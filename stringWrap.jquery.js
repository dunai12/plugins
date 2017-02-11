$.fn.wrapString = function(maxLen, maxSlice){
	var $this = this;

		$this.each(function(){

			var text = this.innerHTML;

			text = text.split('')
					   .slice(0, maxLen + 1);
			
			if(text.length >= maxLen){
				var lastI = maxLen;
				for(var i = 0; i < maxSlice; i++){

					if(text[lastI] !== ' ') {
						lastI--;
						continue;
					}
					text = text.slice(0, lastI);
					break;
				}
				text = text.join('');
				text += '...';
			}else{
				text = text.join('');
			}

			$(this).text(text);
		});

};