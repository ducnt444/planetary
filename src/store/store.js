import Vue from "vue";
import Vuex from "vuex";
import {
  LOADING_TYPE,
  TORIGHT_TYPE,
  TOLEFT_TYPE,
  BOOKING_TYPE,
  LOGIN_TYPE,
} from "./mutationType";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    testKey: "testValue",
    isLoading: true,
    isMuted: false,
    currentPlanetIndex: 0,
    bookings: [],
    isLoggedIn: false,
    users: [
      { username: "user", password: "123" },
      { username: "user2", password: "1234" },
    ],
    planets: [
      {
        id: "1",
        slug: "mercury",
        name: "Mercury",
        img: "Mercury/Mercury.png",
        imgMin: "Mercury/Mercury-min.png",
        background: "Mercury/bg.jpg",
        title: "the Swift Planet",
        symbol: "Mercury/symbol-active.png",
        description:
          "Mercury is the smallest planet in the Solar System and the closest to the Sun. It is named after the Roman god Mercurius (Mercury), god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes (Ἑρμῆς). The planet can only be seen near the western horizon after sunset or the eastern horizon before sunrise, usually in twilight.",
        flights: {
          name: "SS Discovery",
          img: "Mercury/spacecraft.jpg",
          tier: "A-Class",
          desc: `SS Discovery is one of the orbiters from NASA's Space Shuttle program. Over 27 years of service it launched and landed 39 times, aggregating more spaceflights than any other spacecraft to date. Discovery performed both research and International Space Station (ISS) assembly missions, and also carried the Hubble Space Telescope into orbit.`,
        },
        prices: [
          { name: "Standard", number: "$50,000" },
          { name: "Membership", number: "$40,000" },
        ],
        duration: `1 month 7 days (1 way)`,
        stats: {
          Spacecraft: `SS Discovery<sup>TM</sup> <br/> A-Class`,
          Preparation: `2 weeks`,
          "Flight Duration": `2 month 15 days <br/> (Round-trip)`,
          Price: "From $50,000",
        },
        attractions: [
          {
            name: "MESSENGER",
            slug: "messenger",
            img: "Mercury/attraction-1-full.jpg",
            thumbnail: "Mercury/attraction-1.jpg",
            description: `MESSENGER was a NASA robotic space probe that orbited the planet Mercury from 2011, studying Mercury's chemical composition, geology, and magnetic field. The name is a backronym for "Mercury Surface, Space Environment, Geochemistry, and Ranging", and a reference to the messenger god Mercury from Roman mythology.`,
          },
          {
            name: "Caloris Planitia",
            slug: "caloris-planitia",
            img: "Mercury/attraction-2-full.jpg",
            thumbnail: "Mercury/attraction-2.jpg",
            description:
              'Caloris Planitia is a plain within a large impact basin on Mercury, informally named Caloris, about 1,550 km (960 mi) in diameter. It is one of the largest impact basins in the Solar System. "Calor" is Latin for "heat" and the basin is so-named because the Sun is almost directly overhead every second time Mercury passes perihelion. The crater, discovered in 1974, is surrounded by the Caloris Montes, a ring of mountains approximately 2 km (1.2 mi) tall.',
          },
          {
            name: "BepiColombo",
            slug: "bepicolombo",
            img: "Mercury/attraction-3-full.jpg",
            thumbnail: "Mercury/attraction-3.jpg",
            description:
              "BepiColombo is a joint mission of the European Space Agency (ESA) and the Japan Aerospace Exploration Agency (JAXA) to the planet Mercury. The mission comprises two satellites launched together: the Mercury Planetary Orbiter (MPO) and Mio (Mercury Magnetospheric Orbiter, MMO). The mission will perform a comprehensive study of Mercury, including characterization of its magnetic field, magnetosphere, and both interior and surface structure.",
          },
        ],
      },
      {
        id: "2",
        slug: "venus",
        name: "Venus",
        img: "Venus/Venus.png",
        imgMin: "Venus/Venus-min.png",
        background: "Venus/bg.jpg",
        title: "the Brightest One",
        symbol: "Venus/symbol-active.png",
        description:
          "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight. A terrestrial planet, Venus is sometimes called Earth's 'sister planet' because of their similar size, mass, and proximity to the Sun. Venus has been a major fixture in human culture for as long as records have existed. It has been made sacred to gods of many cultures, and has been a prime inspiration for writers and poets as the 'morning star' and 'evening star'.",
        flights: {
          name: "Dream Chaser",
          img: "Venus/spacecraft.jpg",
          tier: "A-Class",
          desc: `Dream Chaser is an American reusable lifting-body spaceplane being developed by Sierra Nevada Corporation (SNC) Space Systems. It is planned to carry up to seven people and cargo to and from low Earth orbit. The cargo Dream Chaser is designed to resupply the International Space Station with both pressurized and unpressurized cargo.`,
        },
        prices: [
          { name: "Standard", number: "$35,000" },
          { name: "Membership", number: "$20,000" },
        ],
        duration: `0 month 25 days (1 way)`,
        stats: {
          Spacecraft: `Dream Chaser<sup>TM</sup> <br/> A-Class`,
          Preparation: `2 weeks`,
          "Flight Duration": `1 month 20 days <br/> (Round-trip)`,
          Price: "From $35,000",
        },
        attractions: [
          {
            name: "Maat Mons",
            slug: "maat-mons",
            img: "Venus/attraction-1-full.jpg",
            thumbnail: "Venus/attraction-1.jpg",
            description:
              "Maat Mons is a massive shield volcano. It is the second-highest mountain, and the highest volcano, on the planet Venus. It rises 8 kilometres (5.0 mi) above the mean planetary radius at 0.5°N 194.6°E, and nearly 5 km above the surrounding plains. It is named after the Egyptian goddess of truth and justice, Ma'at.",
          },
          {
            name: "Venera 14",
            slug: "venera-14",
            img: "Venus/attraction-2-full.jpg",
            thumbnail: "Venus/attraction-2.jpg",
            description:
              "Venera 14 (Russian: Венера-14 meaning Venus 14) was a probe in the Soviet Venera program for the exploration of Venus. Venera 14 was identical to the Venera 13 spacecraft and built to take advantage of the 1981 Venus launch opportunity and launched five days apart. It was launched on 4 November 1981 at 05:31:00 UTC and Venera 13 on 30 October 1981 at 06:04:00 UTC, both with an on-orbit dry mass of 760 kg (1,680 lb).",
          },
          {
            name: "Venus Express",
            slug: "venus-express",
            img: "Venus/attraction-3-full.jpg",
            thumbnail: "Venus/attraction-3.jpg",
            description:
              "Venus Express (VEX) was the first Venus exploration mission of the European Space Agency (ESA). Launched in November 2005, it arrived at Venus in April 2006 and began continuously sending back science data from its polar orbit around Venus. Equipped with seven scientific instruments, the main objective of the mission was the long term observation of the Venusian atmosphere.",
          },
        ],
      },
      {
        id: "3",
        slug: "mars",
        name: "Mars",
        img: "Mars/Mars.png",
        imgMin: "Mars/Mars-min.png",
        background: "Mars/bg.jpg",
        title: "the Next Home",
        symbol: "Mars/symbol-active.png",
        description:
          "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. In English, Mars carries the name of the Roman god of war and is often referred to as the 'Red Planet'. The latter refers to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye. Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.",
        flights: {
          name: "Crew Dragon",
          img: "Mars/spacecraft.jpg",
          tier: "S-Class",
          desc: `Dragon 2 is a class of spacecraft developed and manufactured by SpaceX and Crew Dragon variant is a space capsule capable of ferrying up to seven astronauts. The spacecraft can autonomously dock to the International Space Station (ISS). Crew Dragon is equipped with an integrated launch escape system (LES) consisting of eight SuperDraco engines, capable of accelerating the vehicle away from the rocket in an emergency.`,
        },
        prices: [
          { name: "Standard", number: "$120,000" },
          { name: "Membership", number: "$105,000" },
        ],
        duration: `3 months (1 way)`,
        stats: {
          Spacecraft: `Crew Dragon<sup>TM</sup> <br/> S-Class`,
          Preparation: `2.5 weeks`,
          "Flight Duration": `6 months <br/> (Round-trip)`,
          Price: "From $120,000",
        },
        attractions: [
          {
            name: "Hope",
            slug: "hope",
            img: "Mars/attraction-1-full.jpg",
            thumbnail: "Mars/attraction-1.jpg",
            description:
              "The Hope orbiter was launched on 19 July 2020, and went into orbit around Mars on 9 February 2021. The space probe will study daily and seasonal weather cycles, weather events in the lower atmosphere such as dust storms, and how the weather varies in different regions of the planet. It will also add to knowledge about Mars atmospheric hydrogen and oxygen loss and other possible reasons behind the planet's drastic climate changes.",
          },
          {
            name: "Olympus Mons",
            slug: "olympus-mons",
            img: "Mars/attraction-2-full.jpg",
            thumbnail: "Mars/attraction-2.jpg",
            description:
              "Olympus Mons is an enormous shield volcano on the planet Mars. The volcano has a height of over 21.9 km (13.6 mi or 72,000 ft). Olympus Mons is about two and a half times Mount Everest's height above sea level. It is one of the largest volcanoes, the tallest planetary mountain, and the second tallest mountain currently discovered in the Solar System.",
          },
          {
            name: "Opportunity",
            slug: "opportunity ",
            img: "Mars/attraction-3-full.jpg",
            thumbnail: "Mars/attraction-3.jpg",
            description: `Opportunity, nicknamed "Oppy", is a robotic rover that was active on Mars from 2004 until mid-2018. Opportunity was operational on Mars for 5110 sols (5250 days; 14 years, 136 days). Mission highlights included the initial 90-sol mission, finding meteorites such as Heat Shield Rock. The Opportunity mission is considered one of NASA's most successful ventures.`,
          },
        ],
      },
      {
        id: "4",
        slug: "jupiter",
        name: "Jupiter",
        img: "Jupiter/Jupiter.png",
        imgMin: "Jupiter/Jupiter-min.png",
        background: "Jupiter/bg.jpg",
        title: "the Gaint",
        symbol: "Jupiter/symbol-active.png",
        description:
          "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than 2.5 times that of all the other planets in the Solar System combined, but slightly less than 1/1000 the mass of the Sun. Jupiter is the third-brightest natural object in the Earth's night sky after the Moon and Venus. It is named after the Roman god Jupiter, the king of the gods, because of its observed size. Surrounding Jupiter is a faint planetary ring system with 80 known moons, including the 4 large Galilean moons discovered by Galileo Galilei in 1610.",
        flights: {
          name: "VSS Unity",
          img: "Jupiter/spacecraft.jpg",
          tier: "A-Class",
          desc: `VSS Unity (Virgin Space Ship Unity) is a SpaceShipTwo-class suborbital rocket-powered crewed spaceplane. It is the second SpaceShipTwo to be built and will be used as part of the Virgin Galactic fleet. The name Unity was chosen by British physicist Stephen Hawking. Hawking's eye is also used as the model for the eye logo on the side of Unity.`,
        },
        prices: [
          { name: "Standard", number: "$500,000" },
          { name: "Membership", number: "$475,000" },
        ],
        duration: `6 months (1 way)`,
        stats: {
          Spacecraft: `VSS Unity<sup>TM</sup> <br/> A-Class`,
          Preparation: `3.5 weeks`,
          "Flight Duration": `1 year <br/> (Round-trip)`,
          Price: "From $500,000",
        },
        attractions: [
          {
            name: "Great Red Spot",
            slug: "great-red-spot",
            img: "Jupiter/attraction-1-full.jpg",
            thumbnail: "Jupiter/attraction-1.jpg",
            description:
              "The Great Red Spot is a persistent high-pressure region in the atmosphere of Jupiter, producing an anticyclonic storm that is the largest in the Solar System. Located 22 degrees south of Jupiter's equator, it produces wind-speeds up to 432 km/h. Observations from 1665 to 1713 are believed to be of the same storm; if this is correct, it has existed for at least 356 years.",
          },
          {
            name: "Europa",
            slug: "europa",
            img: "Jupiter/attraction-2-full.jpg",
            thumbnail: "Jupiter/attraction-2.jpg",
            description:
              "Europa, or Jupiter II, is the smallest of the four Galilean moons orbiting Jupiter. It is also the sixth-largest moon in the Solar System. Europa was discovered in 1610 by Galileo Galilei and was named after Europa, the Phoenician mother of King Minos of Crete and lover of Zeus. Slightly smaller than Earth's Moon, Europa is primarily made of silicate rock and has a water-ice crust[14] and probably an iron–nickel core.",
          },
          {
            name: "Juno",
            slug: "Juno",
            img: "Jupiter/attraction-3-full.jpg",
            thumbnail: "Jupiter/attraction-3.jpg",
            description:
              "Juno is a NASA space probe orbiting the planet Jupiter. The spacecraft was launched from Cape Canaveral Air Force Station on 5 August 2011 UTC, as part of the New Frontiers program. Juno's mission is to measure Jupiter's composition, gravitational field, magnetic field, and polar magnetosphere. It will also search for clues about how the planet formed, including whether it has a rocky core, the amount of water present within the deep atmosphere, mass distribution, and its deep winds. Juno's three largest solar panel wings ever deployed on a planetary probe play an integral role in stabilizing the spacecraft as well as generating power.",
          },
        ],
      },
    ],
  },
  getters: {
    planetSlug: (state) => (slug) => {
      return state.planets.find((planet) => planet.slug === slug);
    },
    findUser: (state) => (username) => {
      return state.users.find((user) => user.username === username);
    },
  },
  mutations: {
    [LOGIN_TYPE](state, payload) {
      const userChecking = state.users.find((user) => {
        user.username === payload.username;
      });
      const newObj = { ...userChecking };
      console.log(userChecking);
      console.log(newObj);
      // userChecking ? (state.isLoggedIn = true) : (state.isLoggedIn = false);
    },
    [LOADING_TYPE](state) {
      state.isLoading = false;
    },
    [TORIGHT_TYPE](state) {
      if (state.currentPlanetIndex < state.planets.length - 1)
        state.currentPlanetIndex++;
    },
    [TOLEFT_TYPE](state) {
      if (state.currentPlanetIndex > 0) state.currentPlanetIndex--;
    },
    [BOOKING_TYPE](state, payload) {
      if (payload.date !== "" && payload.number !== "") {
        state.bookings = [
          ...state.bookings,
          {
            planet: payload.planet,
            date: payload.date,
            number: payload.number,
          },
        ];
      }
    },
  },
});

export default store;
