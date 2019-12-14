import * as firebase from "firebase";

/* eslint-disable */

export default {
  state: {
    loadedMeetups: []
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    }
  },
  actions: {
    loadMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageURL: obj[key].imageURL,
              location: obj[key].location,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            });
          }
          commit("setLoadedMeetups", meetups);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      };
      let key;
      let imageURL;
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then(data => {
          key = data.key;
          return key;
        })
        .then(key => {
          let filename = payload.image.name;
          let ext = filename.slice(filename.lastIndexOf("."));
          return firebase
            .storage()
            .ref("meetups/" + key + "." + ext)
            .put(payload.image);
        })
        .then(fileData => {
          fileData.ref.getDownloadURL().then(function(downloadURL) {
            commit("createMeetup", {
              ...meetup,
              imageURL: downloadURL,
              id: key
            });
            firebase
              .database()
              .ref("meetups/" + key)
              .update({ imageURL: downloadURL });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateMeetupData({ commit }, payload) {
      commit("setLoading", true);
      var updateObject = {};
      if (payload.title) {
        updateObject.title = payload.title;
      }
      if (payload.description) {
        updateObject.description = payload.description;
      }
      if (payload.date) {
        updateObject.date = payload.date;
      }
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updateObject)
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetup", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },

    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },

    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    }
  }
};
