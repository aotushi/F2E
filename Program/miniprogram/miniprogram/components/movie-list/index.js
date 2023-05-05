// components/movie-list/index.js
Component({
  externalClasses:['f-class'],
  properties: {
    title: String,
    movies: Array
  },
  lifetimes: {
    attached: function() {

    },
    created: function() {
      console.log('movie-list>created>title', this.data)
    }
  }
})