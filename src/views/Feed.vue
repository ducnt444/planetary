<template>
  <div class="feed-wrapper">
    <!-- <img
      src="@/assets/images/feed/bg7.jpg"
      alt="feed-background"
      class="feed-bg"
    /> -->
    <div class="feed-header">
      <img
        src="@/assets/images/misc/feed-logo.png"
        alt="Planetary News"
        class="header-img"
      />
      <h1 class="header-text">Planetary News</h1>
    </div>
    <div v-if="errored" class="feed-error">Errorred!</div>
    <div v-else class="feed-content">
      <div v-if="loading" class="content-loading">
        <span class="loading-text">Loading</span>
        <b-spinner
          style="width: 20px; height: 20px"
          label="Loading..."
        ></b-spinner>
      </div>
      <div v-else class="content-ready">
        <div class="feed-highlight">
          <img
            :src="
              articles[0].image
                ? articles[0].image
                : require('@/assets/images/misc/' + placeholderImg)
            "
            :alt="articles[0].description"
            class="img img--highlight"
          />
          <h2 class="title title--highlight">
            {{ articles[0].title }}
          </h2>
          <h3 class="description description--highlight">
            {{ articles[0].description }}
          </h3>
        </div>

        <div
          v-for="(article, index) in articles.slice(1)"
          :key="index"
          class="feed-articles"
        >
          <h2 class="title title--articles">
            {{ article.title }}
          </h2>
          <img
            :src="
              article.image
                ? article.image
                : require('@/assets/images/misc/' + placeholderImg)
            "
            :alt="article.title"
            class="img img--articles"
          />
          <h3 class="description description--articles">
            {{ article.description }}
          </h3>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Feed",
  data() {
    return {
      placeholderImg: "placeholder-img.jpg",
      articles: "blank",
      loading: true,
      errored: false,
    };
  },
  methods: {
    randomNumber: function (max, min) {
      return Math.floor(Math.random() * max) + min;
    },
  },
  mounted() {
    let url = "https://gnews.io/api/v4/search?q=NASA&lang=en&token=8fe78f788c1fd6c0dd6b87ff2f352aad";

    /*     let baseUrl =
      "http://api.mediastack.com/v1/news?access_key=cd136b252092d6a120cceb728d665c7b";
    let offset = 0;
    let url =
      baseUrl +
      "&sources=science,technology" +
      "&sources=en" +
      "&keywords=NASA" +
      "&sort=published_desc" +
      "&limit=10" +
      "&offset=" +
      offset; */

    /*     let url =
      "https://newsapi.org/v2/everything?" +
      "q=NASA&" +
      "from=2021-09-02&" +
      "sortBy=popularity&" +
      "language=en&" +
      "apiKey=c0b06579374e4603a6e09b427ed3d790"; */

    axios
      .get(url)
      .then((response) => {
        this.articles = response.data.articles;
        // console.log(this.articles);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style scoped>
.feed-wrapper {
  width: 100%;
  height: 100%;
  max-width: 100%;
  position: relative;
  z-index: 2;
  padding-top: 50px;
  background-image: url(~@/assets/images/feed/bg7.jpg);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.feed-content {
  height: 100%;
  position: relative;
  z-index: 2;
}

.content-loading,
.feed-highlight,
.feed-articles,
.feed-header {
  color: #fff;
  width: 100%;
}

.feed-header {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  height: 50px;
  padding: 5px 0;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
}

.header-img {
  height: 100%;
}
.header-text {
  font-family: EarthOrbiter, Roboto;
  font-size: 24px;
  margin: 0 0 0 15px;
}

.content-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
.loading-text {
  font-size: 30px;
  display: block;
  margin-right: 5px;
}

.content-ready {
  height: 100%;
  overflow: scroll;
}

.feed-highlight {
  padding-bottom: 30px;
}
.feed-articles {
  padding: 20px 15px;
}

.title,
.description {
  margin: 0;
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.title {
  font-weight: 700;
  -webkit-line-clamp: 2;
}
.description {
  font-weight: 400;
  -webkit-line-clamp: 3;
}

.title--highlight {
  font-size: 18px;
  padding: 0 15px 5px 15px;
}
.description--highlight {
  font-size: 16px;
  padding: 0 15px;
}

.title--articles {
  font-size: 16px;
}
.description--articles {
  font-size: 14px;
}

.img {
  width: 100%;
  object-fit: cover;
  margin: 5px 0 15px 0;
}
.img--highlight {
  height: 275px;
  margin-top: 0;
}
.img--articles {
  height: 150px;
}
</style>