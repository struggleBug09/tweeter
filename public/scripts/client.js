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
      url: "/tweets", type: "GET",
      success: function (response) {
        if (timeline.length === 0) {
          timeline = response;
          renderTweets(response);
        } else {
          renderTweets(timeline)
        }

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

    $.ajax({
      url: "/submit", type: "POST", data: submitData,
      success: function (res) {
        //newTweet is initiallized via parsing to create a new array in memory so new mainUser tweets doesn't update previous mainUser tweets
        const newTweetText = res.text;
        let newTweet = JSON.parse(JSON.stringify(mainUser));
        newTweet.content.text = newTweetText;
        timeline.unshift(newTweet);
        $(".tweets-container").empty();
        loadTweets();
      },
      error: function (xhr, status, error) {
        console.error("Error", error);
      }
    });
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
