
var Poll = Backbone.Model.extend({     
  url: "/polls",
  defaults: {
    description: "I just changed this", 
    end_date: "not yet", 
    // poll_id: poll.get("poll_id")
  }        
 
})

var User = Backbone.Model.extend({
  url: "/users",
  defaults: {
    // provider: "facebook", 
    // uid: "",
    // email: "default@gmail.com", 
    // password: "abcd1234"
  }
})

var Photo = Backbone.Model.extend({
  url: "/photos",

  // defaults: {
  //   url: "not yet"
  // }
})


var UserList = Backbone.Collection.extend({
  model: User, 
  url: "/users"
})

var Item = Backbone.Model.extend({
  url: '/items',

  defaults: {
    name: "not yet",
    image: "not yet",
  }
})

var ItemFormView = Backbone.View.extend({
  initialize: function(){

    this.render()
  }, 
  render: function(){

  }, 
  events: {
    "click .add_item_button": "addItemToPoll",
    "click .scraper": "scrapeImage",
  }, 

  scrapeImage: function(e) {
    console.log("scraper clicked!");
    e.preventDefault();
    this.createPhoto();
    $('#gift-one').remove()
    $('#gift-two').remove()
    $('#gift-three').remove()
  },

  createPhoto: function() {
    // e.preventDefault();
    console.log("createImage fired!");
    // var reader = new FileReader();
    //   reader.onload = (function(theFile) {
        photoListView.collection.create({
          url: $('#new_item_url').val(),
          website: $('#new_item_url').val(),
          poll_id: poll.id
          // image: reader.result
        })
      // });
    // reader.readAsDataURL(file);
  },

  addItemToPoll: function(e){
    console.log("file button clicked")
    e.preventDefault();
    this.handleFileSelect($('#files')[0].files[0]);
    $('#gift-one').remove()
    $('#gift-two').remove()
    $('#gift-three').remove()
  },

  handleFileSelect: function(file) {
    console.log("file select fired")
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        itemsListView.collection.create({
          name: $('#new_item_name_input').val(),
          website: $('#new_item_url').val(),
          poll_id: poll.id,
          image: reader.result
        })
      });
    reader.readAsDataURL(file);
  },

  el: function() {
    return $('#new_item_form')
  }
  // addFinishButton: function(e){
  //     e.preventDefault;
  //     var html_string = $('#finish_adding_button_template').html();
  //     $('#finish_button_container').append(html_string);
  //   },    

})

var PhotoList = Backbone.Collection.extend({
  model: Photo, 
  url: "/photos"
})

var PhotoView = Backbone.View.extend({
  initialize: function() {
    this.render();
  }, 
  events: {
    "click [data-action='vote']": 'vote',
  }, 
  resetValues: function() {
    _.each( $('input'), function(input){
      $(input).val('');
    })
  }, 
  render: function(){
    console.log("photoview render fired")
    var self = this;
    this.$el.html(this.model.attributes);
    console.log("this.model.attributes here")
    console.log(this.model.attributes)
    var image = this.model.attributes.url
    var website = 'http://'+this.model.attributes.website+'/';
    this.$el.wrap("<a href="+website+"></a>");
    $("a").attr("target", "_blank");
    this.$el.attr('style', 'background-image:url("'+image+'")');
    console.log("this.model.attributes.url here:")
    console.log(this.model.attributes.url);
    this.$el.attr('id', 'item-id-'+this.model.attributes.id);
    // console.log(this.model.attributes.url)
    // var website = 'http://'+this.model.attributes.website+'/';
    this.$el.attr('class', 'item col-lg-3 col-md-3');
    // var spinner = $("<i class='fa fa-cog fa-spin img-spinner'></i>");
    // this.$el.html(spinner)
    // var img = $('<img>');
    // img.attr('src', image);
    // // console.log(image)
    // // img.className = "hiddenImage";
    // img.load(function(event){
    //     console.log ("img load fired")
    //     spinner.remove();
    //     self.$el.attr('style', 'background-image:url("'+image+'")');
    //     self.$el.wrap("<a href="+website+"></a>");
    //     $("a").attr("target", "_blank");
    //   })
    this.resetValues();
    return this;
  }, 
  vote: function(){
    var votedphoto = voteList.findWhere({user_id: user.id});
    votedphoto.attributes.photo_id = this.model.id;
    votedphoto.save({}, {
        url: "/votes/"+votedphoto.id
    });
    appendVotesToPhotos(voteList.models);
    toggleVoteOption()
  }

})


var PhotoListView = Backbone.View.extend({
  initialize: function(is_buttons){
    this.is_buttons = is_buttons || false;
    this.collection = new PhotoList();
    this.photoViews = []
    this.collection.fetch({data: {poll_id: poll.id}});
    this.listenTo(this.collection, "all", this.render)
  },

  el: function(){
   return $('#item_list') 
  },

  render: function() {

    var self = this;
    _.each(this.photoViews, function(view){
      view.remove();
    })
    this.photoViews = []
    _.each(this.collection.models, function(photo){
      var new_view = new PhotoView({
        model: photo
      });
      self.photoViews.push(new_view)
      self.$el.append(new_view.render().$el)
    })


  }

})

var PhotoVoteListView = Backbone.View.extend({
  initialize: function(){
    this.collection = new PhotoList();
    this.photoViews = []
    this.collection.fetch({data: {poll_id: poll.id}});
    this.listenTo(this.collection, "all", this.render)
  },
  el: function(){
    return $('#item_list')
  },
  render: function() {

    var self = this;
    _.each(this.photoViews, function(view){
      view.remove();
    })

    this.photoViews = []

    _.each(this.collection.models, function(photo){
      var new_view = new PhotoView({
        model: photo
      });
      self.photoViews.push(new_view)
      self.$el.append(new_view.render().$el.append("<button class=\"btn btn-lg btn-danger\" data-action='vote'>Vote!</button>"))
    })

  }
})

var ItemList = Backbone.Collection.extend({
  model: Item, 
  url: "/items"
})

var ItemView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  events: {
    "click .delete": "deleteActivity",
    "click .edit": "enterEdit",
    "click [data-action='vote']": 'vote', 
  },
  // template: function(attrs){
  //   html_string = $('#items_template').html();
  //   // console.log(html_string)
  //   var template_func = _.template(html_string)
  //   return template_func(attrs)
  // },

  resetValues: function() {
    _.each( $('input'), function(input){
      $(input).val('');
    })
  },

  render: function(){
    var self = this;
    this.$el.html(this.model.attributes);
    this.$el.attr('id', 'item-id-'+this.model.attributes.id);
    var image = this.model.attributes.url;
    var website = 'http://'+this.model.attributes.website+'/';
    // console.log(website)
    self.$el.attr('class', 'item col-lg-3 col-md-3');
    var spinner = $("<i class='fa fa-cog fa-spin img-spinner'></i>");
    this.$el.html(spinner)
    var img = $('<img>');
    img.attr('src', image);
    img.className = "hiddenImage";
    img.load(function(event){
      // console.log (website)
        spinner.remove();
        self.$el.attr('style', 'background-image:url("'+image+'")');
        self.$el.wrap("<a href="+website+"></a>");
        $("a").attr("target", "_blank");
      })
    // var aTag = document.createElement('a');
    // aTag.setAttribute('href', '"'+website+'"');
    // aTag.innerHTML = "Gift Link";
    // self.$el.append(aTag);
    // this.resetValues();
    this.resetValues();
    return this;
    },
  
  vote: function(){
    // console.log(votes.responseJSON);
    // this.$('button').remove();
    // this.$el.append('<p>You voted for me!</p>');
    var voteditem = voteList.findWhere({user_id: user.id});
    // console.log(this.model.id);
    console.log(voteditem);
    voteditem.attributes.item_id = this.model.id;
    voteditem.save({}, {
        url: "/votes/"+voteditem.id
    });
    console.log(voteList.models)
    appendVotesToItems(voteList.models);
    toggleVoteOption()
  }

})

var ItemListView = Backbone.View.extend({
  initialize: function(is_buttons){
    this.is_buttons = is_buttons || false;
    this.collection = new ItemList();
    this.itemViews = []
    this.collection.fetch({data: {poll_id: poll.id}});
    this.listenTo(this.collection, "all", this.render)
  },

  // GOING TO FIX THIS, DONT ERASE
  // create_finish_button: function () {
  //   //if two gifts exist then append button
  //   if (itemsListView.collection.length > 1) {
  //     var finished_adding_gifts_button = $('<button>Finished Adding Gifts</button>')
  //     $('#item_list').append(finished_adding_gifts_button)
  //   }
  // }, 

  el: function(){
    return $('#item_list')
  }, 

  render: function() {

    var self = this;
    _.each(this.itemViews, function(view){
      view.remove();
    })
    this.itemViews = []
    _.each(this.collection.models, function(item){
      var new_view = new ItemView({
        model: item
      });
      self.itemViews.push(new_view)
      self.$el.append(new_view.render().$el)
    })


  }
})

var ItemVoteListView = Backbone.View.extend({
  initialize: function(){
    this.collection = new ItemList();
    this.itemViews = []
    this.collection.fetch({data: {poll_id: poll.id}});
    this.listenTo(this.collection, "all", this.render)
  },

  // GOING TO FIX THIS, DONT ERASE
  // create_finish_button: function () {
  //   //if two gifts exist then append button
  //   if (itemsListView.collection.length > 1) {
  //     var finished_adding_gifts_button = $('<button>Finished Adding Gifts</button>')
  //     $('#item_list').append(finished_adding_gifts_button)
  //   }
  // }, 

  el: function(){
    return $('#item_list')
  }, 

  render: function() {

    var self = this;
    _.each(this.itemViews, function(view){
      view.remove();
    })

    this.itemViews = []

    _.each(this.collection.models, function(item){
      var new_view = new ItemView({
        model: item
      });
      self.itemViews.push(new_view)
      self.$el.append(new_view.render().$el.append("<button class=\"btn btn-lg btn-danger\" data-action='vote'>Vote!</button>"))
    })

  }
})

var Vote = Backbone.Model.extend({
  url: "/votes"
})

var VoteList = Backbone.Collection.extend({
  model: Vote, 
  url: "/votes"
})

// var VoteView = Backbone.View.extend({
//   initialize: function(){
//     this.render();
//   },

//   // template: _.template($('#accomplice-view-template').html()),

//   render: function(){
//     this.$el.html(this.template(this.model.attributes));
//     return this
//   }
// });

var VoteListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderVote)
  },

  renderVote: function(vote){
    vote.view = new VoteView({model: vote});
    this.$el.prepend(vote.view.render().el);
    return this;
  }
});


var itemSetup = function (options){
  window.itemsListView = new ItemListView(options); 
  window.photoListView = new PhotoListView(options);
  window.itemformView = new ItemFormView();
  window.item = new Item();
  window.photo = new Photo(); 
}


var itemVoteSetup = function (){
  window.itemVoteListView = new ItemVoteListView();
  window.photoVoteListView = new PhotoVoteListView(); 
  window.itemformView = new ItemFormView();
  window.item = new Item();
  window.photo = new Photo();
  window.itemView = new ItemView({model: item});
  window.photoView = new PhotoView({model: photo})
}

var appendVotesToItems = function(votes){
  _.each(votes, function(vote){
    if(vote.attributes.item_id){
      selector = '#' + vote.attributes.id
      $vote_img = $(selector);
      id = vote.attributes.item_id
      $vote_img.appendTo($('#item-id-'+vote.attributes.item_id))
    }
  })
}

var appendVotesToPhotos = function(votes){
  _.each(votes, function(vote){
    if(vote.attributes.photo_id){
      selector = '#' + vote.attributes.id
      $vote_img = $(selector);
      id = vote.attributes.photo_id
      $vote_img.appendTo($('#item-id-'+vote.attributes.photo_id))
    }
  })
}

var toggleVoteOption = function(){
  $('#item_list button').toggleClass('hidden');
  $('#accomplice-photos button').toggleClass('hidden');
}



