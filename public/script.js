const LOAD_LIMIT = 10

new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			/*{id:1, title: 'Item 1', price: 1.98, qty:0},*/
		],
		results:[],
		cart: [],
		search: 'beer',
        lastSearch: '',
        loading:false
	},
	methods:{
		increment(item){
			item.qty++;
            let priceNum = Number(item.price)
			this.total += priceNum
		},
		decrement(item){
			item.qty--;
			this.total -= item.price
			if(item.qty <= 0){
				//cart.remove(item);
				for (var i=0; i< this.cart.length; i++){
					if (this.cart[i].id === item.id){
						this.cart.splice(i,1)
						break;
					}
				}
			}
		},
		addItem: function(index){
			var item = this.items[index];
            let priceNum = Number(item.price)
			this.total += priceNum;
			//if(this.cart.find(this.items[index]))
			//this.cart.push(this.items[index])

			for (var i=0; i< this.cart.length; i++){
				if (this.cart[i].id === item.id){
					this.cart[i].qty++;
					return;
				}
			}

			//this.cart.push({id: item.id, title: item.title, qty: 1, price: item.price});
			const length = this.cart.push({...item});
			this.cart[length-1].qty++;
		},
        onSubmit:function(){
			//console.log('onSubmit:')
            this.items = [];
            this.loading = true;
            this.$http
				.get('/search/'.concat(this.search))
				.then(function (res) {
							//this.items = res.data.slice(0,10);
                    		this.results = res.data;

                    		let itemsWithPrice = [];
							let limitItems = res.data.length < LOAD_LIMIT ? res.data.length : LOAD_LIMIT

							for(let i = 0 ; i < limitItems; i++){
								//console.log(res.data[i].id + ':'+ res.data[i].title);
								let price = Math.random()*100;
                                itemsWithPrice.push({...res.data[i], price:price,qty:0 })
							}
                    		this.items = itemsWithPrice;
							this.lastSearch= this.search;
                            this.loading = false;
            			}
            	);
        },
		appendItems:function(){
            console.log('appendItems');
			if(this.items.length < this.results.length){
                let itemsWithPrice = [];
                let startIndex = this.items.length;
                let limitItems = (this.results.length < startIndex+LOAD_LIMIT) ?
					(this.results.length - startIndex)
					: (startIndex + LOAD_LIMIT)

                for(let i = startIndex ; i < startIndex + limitItems; i++){
                    let price = Math.random()*100;
                    itemsWithPrice.push({...this.results[i], price:price,qty:0 })
                }
                this.items.push(...itemsWithPrice)
			}
        }
	},
	filters:{
		currency(price){
            let priceNum = Number(price)
            priceNum = priceNum.toFixed(2)
			return '$'.concat(priceNum)
		}
	},
	mounted: function () {
        this.onSubmit();

        var vueInstance = this;
        var watchedElem = document.getElementById('product-list-bottom');
        var watcher = scrollMonitor.create(watchedElem);
        watcher.enterViewport(function () {
            console.log('enterViewport');
            vueInstance.appendItems();
        });

    }
});

