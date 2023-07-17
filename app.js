//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = [`Welcome to The Blogging Odyssey!!! At The Blogging Odyssey, we believe in the power of words, ideas, and stories. We are passionate about creating a space where writers, thinkers, and enthusiasts can come together to share their thoughts, experiences, and expertise.`,`
Explore a World of Possibilities:
Immerse yourself in a world of captivating content that covers a diverse range of topics. From personal reflections to in-depth analyses, from how-to guides to thought-provoking essays, our blog is a treasure trove of knowledge and inspiration.`,`
Connect with Like-minded Individuals:
Join a vibrant community of passionate individuals who share your interests and curiosity. Engage in discussions, exchange ideas, and broaden your perspective as you connect with fellow readers and writers from around the globe.`,
`Discover Fresh Perspectives:
Uncover fresh perspectives and discover new insights as our talented writers bring their unique voices and experiences to the forefront. With each article, you'll embark on a journey of discovery, gaining valuable insights and expanding your horizons.`,
`Stay Informed and Inspired:
Stay up-to-date with the latest trends, news, and developments across various fields. Our dedicated team of writers keeps you informed and inspired, providing you with thought-provoking content that fuels your curiosity and stimulates your intellect.`,
`Become a Contributor:
Are you a passionate writer with a story to share or knowledge to impart? Join our community of contributors and let your voice be heard. Share your expertise, creativity, and unique perspectives with a global audience. Together, let's inspire, educate, and empower.`,
`Start Exploring:
It's time to dive in and embark on an enriching journey. Whether you're seeking information, inspiration, or simply looking for a captivating read, The Blogging Odyssey has something for everyone. Begin exploring our vast collection of articles, and let your imagination soar.`,
`Join us in embracing the power of words and ideas. Together, let's create a community where thoughts are shared, experiences are celebrated, and connections are forged. Welcome to The Blogging Odyssey, where inspiration meets expression.`];
const aboutContent = "Welcome to the About page of The Blogging Odyssey. Here, we provide you with insights into our mission, values, and the inspiration behind our platform.\nOur Mission: At The Blogging Odyssey, our mission is to create a dynamic online space that fosters creativity, knowledge sharing, and community engagement. We aim to empower individuals from all walks of life to express their thoughts, experiences, and expertise, while connecting with a global audience.\nOur Vision:We envision a world where diverse voices are celebrated, where ideas are freely exchanged, and where knowledge transcends borders. Through The Blogging Odyssey, we strive to create a positive impact by facilitating intellectual growth, fostering meaningful connections, and promoting understanding and empathy.";
const contactContent = "We would love to hear from you! At The Blogging Odyssey, we value your feedback, suggestions, and inquiries. Whether you have a question, want to collaborate, or simply want to connect with us, we're here to listen and respond.";

const email = "Email : kckallur40@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [
  {
    title:"The Art of Simple Living",
    body:"Explore the joys of embracing simplicity and living a mindful lifestyle through practical tips, inspiring stories, and creative ideas. From decluttering and minimalism to sustainable living and self-care, this blog offers insights for a balanced and fulfilling life."
  },
  {
    title:"Unleash Your Potential",
    body:"Embark on a journey of personal growth and self-improvement through this motivational blog. Explore topics like goal-setting, productivity, mindset shifts, and success strategies, empowering you to unlock your true potential and create a life you love."
  }
];

app.get("/", function (req, res) {
  res.render("home", { homeStartContent: homeStartingContent, posts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent, email:email});
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:postName", function (req, res) {
  const postName = lodash.lowerCase(req.params.postName);
  for (let i = 0; i < posts.length; i++) {
    let postsTitle = lodash.lowerCase(posts[i].title);
    if (postsTitle === postName) {
      res.render("post", {postTitle:postName , postContent:posts[i].body});
      break;
    }
  }
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.titleContent,
    body: req.body.postContent
  };
  posts.push(post);
  res.redirect("/");
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
