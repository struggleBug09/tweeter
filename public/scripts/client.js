//mainUser is the 'user' of the tweet app account
const mainUser =
{
  "user": {
    "name": "Michael Scott",
    "avatars": "/images/man.png"
    ,
    "handle": "@Not_Carell"
  },
  "content": {
    "text": ""
  },
  "created_at": 1461116232227
}


function renderTweets(tweetArray) {
  tweetArray.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $(".tweets-container").append($tweet);
  });
}

//Timeline array will keep track of tweets that are loaded and submitted
let timeline = [];


function createTweetElement(tweetData) {
  // Initialize tweet as articles
  const $tweet = $("<article>").addClass("tweet");

  // Initializes HEADER and its children
  const $header = $("<header>").addClass("tweet-header");
  const $avatar = $("<img>").addClass("avatars").attr("src", tweetData.user.avatars);
  const $name = $("<span>").addClass("name").text(tweetData.user.name);
  const $handle = $("<span>").addClass("handle").text(tweetData.user.handle);

  // Initializes CONTENT/TEXT for tweets
  const $content = $("<div>").addClass("tweet-content");
  const $text = $("<p>").addClass("text").text(tweetData.content.text);

  // Initializes FOOTER and all its children/nested children
  const $footer = $("<footer>").addClass("tweet-footer");
  const $timestamp = $("<span>").addClass("timestamp").text(timeago.format(new Date(tweetData.created_at)));
  const $favicon = $("<div>").addClass("favicon");
  const $flagIcon = $("<i>").addClass("fa-solid fa-flag");
  const $retweetIcon = $("<i>").addClass("fa-solid fa-retweet");
  const $heartIcon = $("<i>").addClass("fa-solid fa-heart");

  //Children of favicon gets appended to favicon
  $favicon.append($flagIcon, $retweetIcon, $heartIcon);

  //Children of the header, content and footer are appended
  $header.append($avatar, $name, $handle);
  $content.append($text);
  $footer.append($timestamp, $favicon);

  //Appends header, content and footer to tweet so we can return it
  $tweet.append($header, $content, $footer);

  return $tweet;
}



$(document).ready(function () {
  //loads tweets upon ready
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      type: "GET",
      success: function (response) {
        if (timeline.length === 0) {
          // Triggers on first load. Then updates timeline 
          timeline = response;
          renderTweets(response);
        } else {
          // Loads timeline. Response not necessary to pass
          renderTweets(timeline);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error", error);
      }
    });
  }
  
  /*Handles new tweets to be loaded to the timeline and removes -if showing- any err msg upon new submission attempt */
  function submitTweet(data) {
    $.ajax({
      url: "/submit",
      type: "POST",
      data: data,
      success: function (res) {
        const newTweetText = res.text;
        //Stringify + parsing mainUser to create a dupe in memory (prevents reference bug updating old tweets)*/
        let newTweet = JSON.parse(JSON.stringify(mainUser));
        const now = new Date();
        const formattedDate = now.toLocaleString();
        newTweet.created_at = formattedDate;
        newTweet.content.text = newTweetText;
        timeline.unshift(newTweet);
        $(".tweets-container").empty();
        $("#tweet-text").val('');
        loadTweets();
        $('.error-message').hide();
      },
      error: function (xhr, status, error) {
        console.error("Error", error);
      }
    });
  }

  loadTweets();
   
  //Handles err msg logic and animation
  $("form").submit(function (event) {
    event.preventDefault();
    const submitData = $(this).serialize();
    const tweetText = $(this).find('#tweet-text').val().trim();

    if (tweetText.length > 140 || tweetText.length === 0) {
      // Shows appropriate err msg with some animation
      if (tweetText.length > 140) {
        $('.error-message').hide();
        $('#too-long').slideDown();
      } else {
        $('.error-message').hide();
        $('#null-tweet').slideDown();
      }
    } else {
      submitTweet(submitData);
    }
  });
});

//Adds hovered class when hovering to change favicon color
$(document).ready(function () {
  $(document).on('mouseenter', '.favicon i', function () {
    $(this).addClass('hovered');
    console.log("Being hovered right now");
  }).on('mouseleave', '.favicon i', function () {
    $(this).removeClass('hovered');
  });
});

//Adds shadow when hovering over tweets
$(document).ready(function () {
  $(document).on('mouseenter', '.tweet', function () {
    $(this).css('box-shadow', '12px 12px 1px 0px #c5ccf0');
  }).on('mouseleave', '.tweet', function () {
    $(this).css('box-shadow', 'none');
  });
});
