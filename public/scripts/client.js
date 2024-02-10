const data = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png"
  //     ,
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": "https://i.imgur.com/nlhLi3I.png",
  //     "handle": "@rd" },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }
]
function renderTweets(tweetArray) {
  tweetArray.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $(".tweets-container").append($tweet);
  });
}

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


$(document).ready(function() {
  function loadTweets() {
    $.ajax({ url: "/tweets", type: "GET",
      success: function(response) {
        console.log("This tweet was loaded", response);
        renderTweets(response);
      },
      error: function(xhr, status, error) {
        console.error("Error", error);
      }
    });
  }
  loadTweets();

  $("form").submit(function(event) {
    event.preventDefault();

    const submitData = $(this).serialize();

    $.ajax({ url: "/submit", type: "POST",  data: submitData,
      success: function(res) {
        console.log("Form submit works");
      },
      error: function(xhr, status, error) {
        console.error("Error", error);
      }
    });
  });
});
