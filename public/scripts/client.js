const mainUser =
{
  "user": {
    "name": "Michael Scott",
    "avatars": "https://i.imgur.com/73hZDYK.png"
    ,
    "handle": "@office_guy14"
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

  // Initializes CONTENT for tweets
  const $content = $("<div>").addClass("tweet-content");
  const $text = $("<p>").addClass("text").text(tweetData.content.text);

  // Initializes FOOTER and all its children/nested children
  const $footer = $("<footer>").addClass("tweet-footer");
  const $timestamp = $("<span>").addClass("timestamp").text("10 days ago");
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

  //Appends header, content and footer to tweet so as can return it
  $tweet.append($header, $content, $footer);

  return $tweet;
}


$(document).ready(function () {
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
  
  function submitTweet(data) {
    $.ajax({
      url: "/submit",
      type: "POST",
      data: data,
      success: function (res) {
        const newTweetText = res.text;
        let newTweet = JSON.parse(JSON.stringify(mainUser));
        newTweet.content.text = newTweetText;
        timeline.unshift(newTweet);
        $(".tweets-container").empty();
        loadTweets();
        // Hide any error messages after successful submission
        $('.error-message').hide();
      },
      error: function (xhr, status, error) {
        console.error("Error", error);
      }
    });
  }

  loadTweets();

  $("form").submit(function (event) {
    event.preventDefault();
    const submitData = $(this).serialize();
    const tweetText = $(this).find('#tweet-text').val().trim();

    // Check for invalid tweet (null or too long)
    if (tweetText.length > 140 || tweetText.length === 0) {
      // Show the appropriate error message
      if (tweetText.length > 140) {
        $('#too-long').show();
      } else {
        $('#null-tweet').show();
      }
    } else {
      submitTweet(submitData);
    }
  });
});


$(document).ready(function () {
  $(document).on('mouseenter', '.favicon i', function () {
    $(this).addClass('hovered');
    console.log("Being hovered right now");
  }).on('mouseleave', '.favicon i', function () {
    $(this).removeClass('hovered');
  });
});

$(document).ready(function () {
  $(document).on('mouseenter', '.tweet', function () {
    $(this).css('box-shadow', '12px 12px 1px 0px #c5ccf0');
  }).on('mouseleave', '.tweet', function () {
    $(this).css('box-shadow', 'none');
  });
});
