<!DOCTYPE html>
<html>
<head>
  <title>Giftr</title>
  <link href='http://fonts.googleapis.com/css?family=Gafata|Prosto+One|Alegreya+SC|Patua+One|Raleway|PT+Serif' rel='stylesheet' type='text/css'>
  <%= stylesheet_link_tag    "application", :media => "all" %>
  <%= javascript_include_tag "application" %>
  <%= csrf_meta_tags %>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href='http://fonts.googleapis.com/css?family=Poiret+One|Ubuntu|Josefin+Slab|Love+Ya+Like+A+Sister|Megrim|Roboto+Slab|Allan|Bubbler+One|Roboto' rel='stylesheet' type='text/css'>
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">

  <!-- Script to make fullPage sticky scrolling work. using media query that disable sticky scrolling if page is less than 500px -->
  <script type="text/javascript">
    $(document).ready(function() {
    if (mq.matches) {
       $.fn.fullpage({   
          resize : false, // Stops the splash page from resizing it's text when the page width is changed.
        anchors: ['firstPage', 'secondPage', '3rdPage', 'lastPage'] //Tells fullPage that we're scrolling through four page sections.
        });
  // window width is at least 500px
  console.log("at least 500px")
} else {
  console.log ("else works")
  $.fn.fullpage({
   autoScrolling: false,            
   resize : false, // Stops the splash page from resizing it's text when the page width is changed.
          
   anchors: ['firstPage', 'secondPage', '3rdPage', 'lastPage'] //Tells fullPage that we're scrolling through four page sections.
        })};
    }); 
  </script>

</head>
<body>

<nav id="navigation" class="navbar navbar-inverse navbar-fixed-top" role="navigation">

  <div class="container">

    <a class="navbar-brand" href=<%= root_path %>>Giftr</a>

    <button class="navbar-toggle" data-toggle="collapse" data-target=".navHeaderCollapse">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>

    <div class="collapse navbar-collapse navHeaderCollapse">
      <ul class="signin nav navbar-nav navbar-right">
        <% if user_signed_in? %>
          <li><%= link_to "New Poll", polls_path %></li>
          <li class="active"><%= link_to "Sign Out", destroy_user_session_path %></li>
        <% else %>
          <li><%= link_to "Sign In with Facebook", user_omniauth_authorize_path(:facebook) %></li>
        <% end %>
      </ul>
    </div><!-- END .navbar-collapse -->
    
  </div><!-- END .container-fluid -->
</nav>

<!-- <div class="container-fluid"> -->
 
    <%= yield %>

<!-- </div> -->

</body>
</html>
