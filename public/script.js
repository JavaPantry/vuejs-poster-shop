new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{title: 'Item 1', price: 1},
			{title: 'Item 2', price: 22},
			{title: 'Item 3', price: 33},
			{title: 'Item 4', price: 10},
		],
		cart: []
	},
	methods:{
		addItem: function(index){
			this.total += this.items[index].price;
			this.cart.push(this.items[index])
		}
	}
});