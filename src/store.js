export default {
  user: null,
  planets: [
    {
      id: "1",
      slug: "mercury",
      name: "Mercury",
      img: "Mercury/Mercury.png",
      background: "images/planets/Mercury/bg.jpg",
      text: "the Swift Planet",
      attractions: [
        {
          name: "MESSENGER",
          slug: "messenger",
          image: "",
          description:
            "MESSENGER was a NASA robotic space probe that orbited the planet Mercury between 2011 and 2015",
        },
        {
          name: "BepiColombo",
          slug: "bepicolombo",
          image: "  ",
          description:
            "BepiColombo is a joint mission of the European Space Agency (ESA) and the Japan Aerospace Exploration Agency (JAXA) to the planet Mercury",
        },
      ],
    },
    {
      id: "2",
      slug: "venus",
      name: "Venus",
      img: "Venus/Venus.png",
      background: "images/planets/Venus/bg.jpg",
      text: "the Brightest One",
      attractions: [
        {
          name: "Mariner 2",
          slug: "mariner-2",
          image: "",
          description:
            "Mariner 2 (Mariner-Venus 1962), an American space probe to Venus, was the first robotic space probe to conduct a successful planetary encounter",
        },
        {
          name: "Magellan",
          slug: "magellan",
          image: "  ",
          description:
            "The Magellan spacecraft was a 1,035-kilogram (2,282 lb) robotic space probe launched by NASA of the United States, on May 4, 1989, to map the surface of Venus by using synthetic-aperture radar and to measure the planetary gravitational field.",
        },
      ],
    },
    {
      id: "3",
      slug: "mars",
      name: "Mars",
      img: "Mars/Mars.png",
      background: "images/planets/Mars/bg.webp",
      text: "the Next Home",
      attractions: [
        {
          name: "Mariner-4",
          slug: "mariner-4",
          image: "",
          description:
            "Mariner 4 (together with Mariner 3 known as Mariner-Mars 1964) was the fourth in a series of spacecraft intended for planetary exploration in a flyby mode.",
        },
        {
          name: "Mars Express",
          slug: "mars-express",
          image: "  ",
          description:
            "Mars Express is a space exploration mission being conducted by the European Space Agency (ESA). The Mars Express mission is exploring the planet Mars, and is the first planetary mission attempted by the agency.",
        },
      ],
    },
  ],
};
