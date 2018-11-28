new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{id:1, title: 'Item 1', price: 1.98, qty:0},
			{id:2, title: 'Item 2', price: 22.99, qty:0},
			{id:3, title: 'Item 3', price: 33.99, qty:0},
			{id:4, title: 'Item 4', price: 10.50, qty:0},
		],
		cart: []
	},
	methods:{
		addItem: function(index){
			var item = this.items[index];
			this.total += item.price;
			//if(this.cart.find(this.items[index]))
			//this.cart.push(this.items[index])
			
			for (var i=0; i< this.cart.length; i++){
				if (this.cart[i].id === item.id){
					this.cart[i].qty++;
					return;
				}
			}
			
			//this.cart.push({id: item.id, title: item.title, qty: 1, price: item.price});
			this.cart.push({...item});
		}
	},
	filters:{
		currency(price){
			price = price.toFixed(2)
			return '$'.concat(price)
		}
	}
});