/*! Built with http://stenciljs.com */
const { h } = window.App;

import { createThemedClasses } from './chunk2.js';
import { debounceEvent } from './chunk1.js';

class AppPlay {
    constructor() {
        this.playersPositions = ['DEF', 'ATK', 'ATK', 'DEF'];
        this.loading = true;
        this.players = [null, null, null, null];
    }
    componentWillLoad() {
        db.collection("users").get().then((querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                const user = Object.assign({}, doc.data(), { id: doc.id });
                user.displayName = user.nickname ? user.nickname : (`${user.name} ${user.surname}`);
                users.push(user);
            });
            this.users = users;
            this.search('');
            this.loading = false;
        });
    }
    search(input) {
        const searchTerm = input.value;
        const regExp = new RegExp(searchTerm, "i");
        if (searchTerm) {
            this.filteredPersons = this.users.filter(person => (person.name.search(regExp) !== -1 || person.surname.search(regExp) !== -1 || person.nickname.search(regExp) !== -1));
        }
        else {
            this.filteredPersons = this.users;
        }
    }
    getPositionStyle(index, userId) {
        const player = this.players[index];
        return player && player.id === userId ? 'solid' : 'clear';
    }
    selectPlayer(index, user) {
        const positionPlayer = this.players[index];
        if (positionPlayer && positionPlayer.id === user.id) {
            return;
        }
        this.players = this.players.map((player, i) => {
            if (index === i) {
                return user;
            }
            if (player && player.id === user.id) {
                return null;
            }
            return player;
        });
    }
    getSlicedPlayer({ id, displayName, imageURL }) {
        return { id, displayName, imageURL };
    }
    startMatch(event) {
        event.preventDefault();
        //this.toastCtrl
        //TODO SWITCH TO INDEX INSTEAD OF WHOLE OBJECT WHEN CHANGIN DATABASE
        db.collection("matches").add({
            startTime: new Date(),
            locals: {
                'DEF': this.getSlicedPlayer(this.players[0]),
                'ATK': this.getSlicedPlayer(this.players[1])
            },
            visitors: {
                'ATK': this.getSlicedPlayer(this.players[2]),
                'DEF': this.getSlicedPlayer(this.players[3])
            },
        })
            .then(function (docRef) {
            const teamId = docRef.id;
            window.location.href = `match/${teamId}`;
        })
            .catch(function (error) {
            //TODO, handle error
            console.error("Error adding document: ", error);
        });
    }
    renderUserList() {
        return h("ion-list", { class: "users" }, this.filteredPersons.map((user) => h("ion-item", null,
            h("ion-avatar", null,
                h("img", { src: user.imageURL })),
            user.displayName,
            h("div", { class: "positions" }, this.playersPositions.map((position, i) => {
                return h("ion-button", { round: true, onClick: () => this.selectPlayer(i, user), fill: this.getPositionStyle(i, user.id) }, position);
            })))));
    }
    getSummaryPlayer(index) {
        const player = this.players[index];
        return h("div", { class: "player" },
            h("ion-avatar", null,
                h("img", { src: player ? player.imageURL : '/assets/images/default_avatar.jpg' })),
            h("span", null, player ? player.displayName : ''));
    }
    renderSummary() {
        return h("ion-card", { class: "summary" },
            h("form", { onSubmit: (e) => this.startMatch(e) },
                h("div", { class: "players" },
                    h("div", { class: "team" },
                        this.getSummaryPlayer(0),
                        this.getSummaryPlayer(1)),
                    h("span", { class: "versus" }, "VS"),
                    h("div", { class: "team" },
                        this.getSummaryPlayer(2),
                        this.getSummaryPlayer(3))),
                h("ion-button", { expand: "full", type: "submit", disabled: this.players.some((player) => !player) }, "Start Match")));
    }
    render() {
        return (h("ion-page", null,
            h("ion-header", null,
                h("ion-toolbar", { color: 'primary' },
                    h("ion-title", null, "New Match"))),
            !this.loading ? (this.users.length ? [
                h("ion-searchbar", { onIonInput: (e) => this.search(e.target) }),
                h("ion-content", null, this.renderUserList()),
                h("ion-footer", null, this.renderSummary())
            ] : h("ion-content", null, "Not users yet")) : h("ion-content", null, "Loading Users")));
    }
    static get is() { return "app-play"; }
    static get properties() { return { "filteredPersons": { "state": true }, "loading": { "state": true }, "players": { "state": true }, "toastCtrl": { "connect": "ion-toast-controller" }, "users": { "state": true } }; }
    static get style() { return "app-play ion-scroll {\n  padding: 15px;\n}\n\napp-play ion-list.users ion-avatar {\n  margin-right: 10px;\n}\n\napp-play ion-list.users .positions {\n  margin-left: auto;\n}\n\napp-play ion-list.users .positions ion-button:nth-child(n+3) {\n  --ion-color-primary: #e03131;\n  --ion-color-primary-shade: #ff3838;\n}\n\napp-play ion-card.summary {\n  padding: 10px;\n}\n\napp-play ion-card.summary .players {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n}\n\napp-play ion-card.summary .players .team {\n  display: flex;\n  flex-grow: 1;\n  max-width: 200px;\n  justify-content: space-evenly;\n}\n\napp-play ion-card.summary .players .team .player {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\napp-play ion-card.summary .players .team .player span {\n  text-align: center;\n  min-height: 20px;\n}\n\napp-play ion-card.summary .players .team ion-avatar {\n  border: 3px solid #3171e0;\n}\n\napp-play ion-card.summary .players .team:last-child ion-avatar {\n  border: 3px solid #e03131;\n}\n\napp-play ion-card.summary .players .versus {\n  font-size: 40px;\n}"; }
}

class Card {
    static get is() { return "ion-card"; }
    static get host() { return { "theme": "card" }; }
    static get properties() { return { "color": { "type": String, "attr": "color" }, "mode": { "type": "Any", "attr": "mode" } }; }
    static get style() { return "ion-card {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  position: relative;\n  display: block;\n  overflow: hidden;\n}\n\nion-card img {\n  display: block;\n  width: 100%;\n}\n\n.card-md {\n  margin: 10px;\n  border-radius: 2px;\n  width: calc(100% - 20px);\n  font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  color: var(--ion-text-md-color-step-150, var(--ion-text-color-step-150, #262626));\n  background-color: var(--ion-item-md-background-color, var(--ion-item-background-color, var(--ion-background-color, #fff)));\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n\n.card-md ion-list {\n  margin-bottom: 0;\n}\n\n.card-md > .item:last-child,\n.card-md > .item:last-child .item-inner,\n.card-md > .item-sliding:last-child .item {\n  border-bottom: 0;\n}\n\n.card-md .item-md .item-inner {\n  border: 0;\n}\n\n.card .note-md {\n  font-size: 13px;\n}\n\n.card-md h1 {\n  margin: 0 0 2px;\n  font-size: 24px;\n  font-weight: normal;\n  color: var(--ion-text-md-color-step-150, var(--ion-text-color-step-150, #262626));\n}\n\n.card-md h2 {\n  margin: 2px 0;\n  font-size: 16px;\n  font-weight: normal;\n  color: var(--ion-text-md-color-step-150, var(--ion-text-color-step-150, #262626));\n}\n\n.card-md h3,\n.card-md h4,\n.card-md h5,\n.card-md h6 {\n  margin: 2px 0;\n  font-size: 14px;\n  font-weight: normal;\n  color: var(--ion-text-md-color-step-150, var(--ion-text-color-step-150, #262626));\n}\n\n.card-md p {\n  margin: 0 0 2px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1.5;\n  color: var(--ion-text-md-color-step-150, var(--ion-text-color-step-150, #262626));\n}\n\n.card-md + ion-card {\n  margin-top: 0;\n}\n\n.card-md .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-primary {\n  color: var(--ion-color-md-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  background-color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-primary h1,\n.card-md-primary h2,\n.card-md-primary h3,\n.card-md-primary h4,\n.card-md-primary h5,\n.card-md-primary h6,\n.card-md-primary p {\n  color: var(--ion-color-md-primary-contrast, var(--ion-color-primary-contrast, #fff));\n}\n\n.card-md-primary .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-primary .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-primary .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-primary .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-primary .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-primary .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-primary .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-primary .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-primary .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-secondary {\n  color: var(--ion-color-md-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n  background-color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-secondary h1,\n.card-md-secondary h2,\n.card-md-secondary h3,\n.card-md-secondary h4,\n.card-md-secondary h5,\n.card-md-secondary h6,\n.card-md-secondary p {\n  color: var(--ion-color-md-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n}\n\n.card-md-secondary .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-secondary .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-secondary .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-secondary .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-secondary .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-secondary .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-secondary .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-secondary .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-secondary .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-tertiary {\n  color: var(--ion-color-md-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n  background-color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-tertiary h1,\n.card-md-tertiary h2,\n.card-md-tertiary h3,\n.card-md-tertiary h4,\n.card-md-tertiary h5,\n.card-md-tertiary h6,\n.card-md-tertiary p {\n  color: var(--ion-color-md-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n}\n\n.card-md-tertiary .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-tertiary .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-tertiary .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-tertiary .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-tertiary .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-tertiary .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-tertiary .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-tertiary .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-tertiary .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-success {\n  color: var(--ion-color-md-success-contrast, var(--ion-color-success-contrast, #fff));\n  background-color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-success h1,\n.card-md-success h2,\n.card-md-success h3,\n.card-md-success h4,\n.card-md-success h5,\n.card-md-success h6,\n.card-md-success p {\n  color: var(--ion-color-md-success-contrast, var(--ion-color-success-contrast, #fff));\n}\n\n.card-md-success .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-success .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-success .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-success .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-success .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-success .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-success .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-success .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-success .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-warning {\n  color: var(--ion-color-md-warning-contrast, var(--ion-color-warning-contrast, #000));\n  background-color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-warning h1,\n.card-md-warning h2,\n.card-md-warning h3,\n.card-md-warning h4,\n.card-md-warning h5,\n.card-md-warning h6,\n.card-md-warning p {\n  color: var(--ion-color-md-warning-contrast, var(--ion-color-warning-contrast, #000));\n}\n\n.card-md-warning .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-warning .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-warning .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-warning .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-warning .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-warning .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-warning .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-warning .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-warning .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-danger {\n  color: var(--ion-color-md-danger-contrast, var(--ion-color-danger-contrast, #fff));\n  background-color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-danger h1,\n.card-md-danger h2,\n.card-md-danger h3,\n.card-md-danger h4,\n.card-md-danger h5,\n.card-md-danger h6,\n.card-md-danger p {\n  color: var(--ion-color-md-danger-contrast, var(--ion-color-danger-contrast, #fff));\n}\n\n.card-md-danger .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-danger .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-danger .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-danger .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-danger .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-danger .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-danger .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-danger .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-danger .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-light {\n  color: var(--ion-color-md-light-contrast, var(--ion-color-light-contrast, #000));\n  background-color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-light h1,\n.card-md-light h2,\n.card-md-light h3,\n.card-md-light h4,\n.card-md-light h5,\n.card-md-light h6,\n.card-md-light p {\n  color: var(--ion-color-md-light-contrast, var(--ion-color-light-contrast, #000));\n}\n\n.card-md-light .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-light .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-light .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-light .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-light .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-light .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-light .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-light .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-light .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-medium {\n  color: var(--ion-color-md-medium-contrast, var(--ion-color-medium-contrast, #000));\n  background-color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-medium h1,\n.card-md-medium h2,\n.card-md-medium h3,\n.card-md-medium h4,\n.card-md-medium h5,\n.card-md-medium h6,\n.card-md-medium p {\n  color: var(--ion-color-md-medium-contrast, var(--ion-color-medium-contrast, #000));\n}\n\n.card-md-medium .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-medium .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-medium .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-medium .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-medium .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-medium .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-medium .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-medium .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-medium .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md-dark {\n  color: var(--ion-color-md-dark-contrast, var(--ion-color-dark-contrast, #fff));\n  background-color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}\n\n.card-md-dark h1,\n.card-md-dark h2,\n.card-md-dark h3,\n.card-md-dark h4,\n.card-md-dark h5,\n.card-md-dark h6,\n.card-md-dark p {\n  color: var(--ion-color-md-dark-contrast, var(--ion-color-dark-contrast, #fff));\n}\n\n.card-md-dark .text-md-primary {\n  color: var(--ion-color-md-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-md-dark .text-md-secondary {\n  color: var(--ion-color-md-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-md-dark .text-md-tertiary {\n  color: var(--ion-color-md-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-md-dark .text-md-success {\n  color: var(--ion-color-md-success, var(--ion-color-success, #10dc60));\n}\n\n.card-md-dark .text-md-warning {\n  color: var(--ion-color-md-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-md-dark .text-md-danger {\n  color: var(--ion-color-md-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-md-dark .text-md-light {\n  color: var(--ion-color-md-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-md-dark .text-md-medium {\n  color: var(--ion-color-md-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-md-dark .text-md-dark {\n  color: var(--ion-color-md-dark, var(--ion-color-dark, #222428));\n}"; }
    static get styleMode() { return "md"; }
}

class Footer {
    constructor() {
        /**
         * If true, the footer will be translucent.
         * Note: In order to scroll content behind the footer, the `fullscreen`
         * attribute needs to be set on the content.
         * Defaults to `false`.
         */
        this.translucent = false;
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, this.color, 'header-translucent') : {};
        const hostClasses = Object.assign({}, themedClasses);
        return {
            class: hostClasses
        };
    }
    static get is() { return "ion-footer"; }
    static get host() { return { "theme": "footer" }; }
    static get properties() { return { "translucent": { "type": Boolean, "attr": "translucent" } }; }
    static get style() { return "ion-footer {\n  position: relative;\n  z-index: 10;\n  display: block;\n  order: 1;\n  width: 100%;\n}"; }
    static get styleMode() { return "md"; }
}

class List {
    /**
     * Get the [Item Sliding](../../item-sliding/ItemSliding) that is currently opene.
     */
    getOpenItem() {
        return this.openItem;
    }
    /**
     * Set an [Item Sliding](../../item-sliding/ItemSliding) as the open item.
     */
    setOpenItem(itemSliding) {
        this.openItem = itemSliding;
    }
    /**
     * Close the sliding items. Items can also be closed from the [Item Sliding](../../item-sliding/ItemSliding).
     * Returns a boolean value of whether it closed an item or not.
     */
    closeSlidingItems() {
        if (this.openItem) {
            this.openItem.close();
            this.openItem = null;
            return true;
        }
        return false;
    }
    static get is() { return "ion-list"; }
    static get host() { return { "theme": "list" }; }
    static get properties() { return { "closeSlidingItems": { "method": true }, "getOpenItem": { "method": true }, "setOpenItem": { "method": true } }; }
    static get style() { return "ion-list {\n  margin: 0;\n  padding: 0;\n  display: block;\n  contain: content;\n  list-style-type: none;\n}\n\nion-list[inset] {\n  overflow: hidden;\n  transform: translateZ(0);\n}\n\n.list-md {\n  margin: -1px 0 16px;\n}\n\n.list-md + .list ion-list-header {\n  margin-top: -16px;\n}\n\n.list-md > .input:last-child::after {\n  left: 0;\n}\n\n.list-md[inset] {\n  margin: 16px;\n  border-radius: 2px;\n}\n\n.list-md[inset] ion-item:first-child .item-md {\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n  border-top-width: 0;\n}\n\n.list-md[inset] ion-item:last-child .item-md {\n  border-bottom-right-radius: 2px;\n  border-bottom-left-radius: 2px;\n  border-bottom-width: 0;\n}\n\n.list-md[inset] .item-input {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.list-md[inset] + ion-list[inset] {\n  margin-top: 0;\n}\n\n.list-md[inset] ion-list-header {\n  background-color: var(--ion-item-md-background-color, var(--ion-item-background-color, var(--ion-background-color, #fff)));\n}\n\n.list-md[no-lines] .item-md,\n.list-md[no-lines] .item-md .item-inner {\n  border-width: 0;\n}"; }
    static get styleMode() { return "md"; }
}

class Searchbar {
    constructor() {
        this.isCancelVisible = false;
        this.shouldBlur = true;
        this.shouldAlignLeft = true;
        this.activated = false;
        this.focused = false;
        /**
         * If true, enable searchbar animation. Default `false`.
         */
        this.animated = false;
        /**
         * Set the input's autocomplete property. Values: `"on"`, `"off"`. Default `"off"`.
         */
        this.autocomplete = 'off';
        /**
         * Set the input's autocorrect property. Values: `"on"`, `"off"`. Default `"off"`.
         */
        this.autocorrect = 'off';
        /**
         * Set the the cancel button text. Default: `"Cancel"`.
         */
        this.cancelButtonText = 'Cancel';
        /**
         * Set the amount of time, in milliseconds, to wait to trigger the `ionInput` event after each keystroke. Default `250`.
         */
        this.debounce = 250;
        /**
         * Set the input's placeholder. Default `"Search"`.
         */
        this.placeholder = 'Search';
        /**
         * If true, show the cancel button. Default `false`.
         */
        this.showCancelButton = false;
        /**
         * If true, enable spellcheck on the input. Default `false`.
         */
        this.spellcheck = false;
        /**
         * Set the type of the input. Values: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, `"url"`. Default `"search"`.
         */
        this.type = 'search';
    }
    debounceChanged() {
        this.ionInput = debounceEvent(this.ionInput, this.debounce);
    }
    componentDidLoad() {
        this.positionElements();
        this.debounceChanged();
    }
    /**
     * Clears the input field and triggers the control change.
     */
    clearInput(ev) {
        this.ionClear.emit({ event: ev });
        // setTimeout() fixes https://github.com/ionic-team/ionic/issues/7527
        // wait for 4 frames
        setTimeout(() => {
            const value = this.value;
            if (value !== undefined && value !== '') {
                this.value = '';
                this.ionInput.emit({ event: ev });
            }
        }, 16 * 4);
        this.shouldBlur = false;
    }
    /**
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    cancelSearchbar(ev) {
        this.ionCancel.emit({ event: ev });
        this.clearInput(ev);
        this.shouldBlur = true;
        this.activated = false;
    }
    /**
     * Update the Searchbar input value when the input changes
     */
    inputChanged(ev) {
        this.value = ev.target && ev.target.value;
        this.ionInput.emit(ev);
    }
    inputUpdated() {
        // const inputEl = this.el.querySelector('.searchbar-input') as HTMLInputElment;
        // It is important not to re-assign the value if it is the same, because,
        // otherwise, the caret is moved to the end of the input
        // if (inputEl && inputEl.value !== this.value) {
        //   // inputEl.value = this.value;
        //   this.value = inputEl.value;
        // }
        this.positionElements();
    }
    /**
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     */
    inputBlurred() {
        const inputEl = this.el.querySelector('.searchbar-input');
        // shouldBlur determines if it should blur
        // if we are clearing the input we still want to stay focused in the input
        if (this.shouldBlur === false) {
            inputEl.focus();
            this.shouldBlur = true;
            this.ionBlur.emit({ this: this });
            this.inputUpdated();
            return;
        }
        this.focused = false;
        this.positionElements();
    }
    /**
     * Sets the Searchbar to focused and active on input focus.
     */
    inputFocused() {
        this.activated = true;
        this.focused = true;
        this.ionFocus.emit({ this: this });
        this.inputUpdated();
        this.positionElements();
    }
    /**
     * Positions the input search icon, placeholder, and the cancel button
     * based on the input value and if it is focused. (ios only)
     */
    positionElements() {
        const prevAlignLeft = this.shouldAlignLeft;
        const shouldAlignLeft = (!this.animated || (this.value && this.value.toString().trim() !== '') || this.focused === true);
        this.shouldAlignLeft = shouldAlignLeft;
        if (this.mode !== 'ios') {
            return;
        }
        if (prevAlignLeft !== shouldAlignLeft) {
            this.positionPlaceholder();
        }
        if (this.animated) {
            this.positionCancelButton();
        }
    }
    /**
     * Positions the input placeholder
     */
    positionPlaceholder() {
        const isRTL = document.dir === 'rtl';
        const inputEl = this.el.querySelector('.searchbar-input');
        const iconEl = this.el.querySelector('.searchbar-search-icon');
        if (this.shouldAlignLeft) {
            inputEl.removeAttribute('style');
            iconEl.removeAttribute('style');
        }
        else {
            // Create a dummy span to get the placeholder width
            const tempSpan = document.createElement('span');
            tempSpan.innerHTML = this.placeholder;
            document.body.appendChild(tempSpan);
            // Get the width of the span then remove it
            const textWidth = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);
            // Calculate the input padding
            const inputLeft = 'calc(50% - ' + (textWidth / 2) + 'px)';
            // Calculate the icon margin
            const iconLeft = 'calc(50% - ' + ((textWidth / 2) + 30) + 'px)';
            // Set the input padding start and icon margin start
            if (isRTL) {
                inputEl.style.paddingRight = inputLeft;
                iconEl.style.marginRight = iconLeft;
            }
            else {
                inputEl.style.paddingLeft = inputLeft;
                iconEl.style.marginLeft = iconLeft;
            }
        }
    }
    /**
     * Show the iOS Cancel button on focus, hide it offscreen otherwise
     */
    positionCancelButton() {
        const isRTL = document.dir === 'rtl';
        const cancelButton = this.el.querySelector('.searchbar-cancel-button-ios');
        const shouldShowCancel = this.focused;
        if (shouldShowCancel !== this.isCancelVisible) {
            const cancelStyle = cancelButton.style;
            this.isCancelVisible = shouldShowCancel;
            if (shouldShowCancel) {
                if (isRTL) {
                    cancelStyle.marginLeft = '0';
                }
                else {
                    cancelStyle.marginRight = '0';
                }
            }
            else {
                const offset = cancelButton.offsetWidth;
                if (offset > 0) {
                    if (isRTL) {
                        cancelStyle.marginLeft = -offset + 'px';
                    }
                    else {
                        cancelStyle.marginRight = -offset + 'px';
                    }
                }
            }
        }
    }
    hostData() {
        return {
            class: {
                'searchbar-active': this.activated,
                'searchbar-animated': this.animated,
                'searchbar-has-value': (this.value !== undefined && this.value !== ''),
                'searchbar-show-cancel': this.showCancelButton,
                'searchbar-left-aligned': this.shouldAlignLeft,
                'searchbar-has-focus': this.focused
            }
        };
    }
    render() {
        const cancelButtonClasses = createThemedClasses(this.mode, this.color, 'searchbar-cancel-button');
        const searchIconClasses = createThemedClasses(this.mode, this.color, 'searchbar-search-icon');
        const cancelButton = this.showCancelButton
            ? h("button", { type: 'button', tabindex: this.mode === 'ios' && !this.activated ? -1 : undefined, onClick: this.cancelSearchbar.bind(this), onMouseDown: this.cancelSearchbar.bind(this), class: cancelButtonClasses }, this.mode === 'md'
                ? h("ion-icon", { name: 'md-arrow-back' })
                : this.cancelButtonText)
            : null;
        const searchbar = [
            h("div", { class: 'searchbar-input-container' },
                this.mode === 'md' ? cancelButton : null,
                h("div", { class: searchIconClasses }),
                h("input", { class: 'searchbar-input', onInput: this.inputChanged.bind(this), onBlur: this.inputBlurred.bind(this), onFocus: this.inputFocused.bind(this), placeholder: this.placeholder, type: this.type, value: this.value, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, spellCheck: this.spellcheck }),
                h("button", { type: 'button', class: 'searchbar-clear-icon', onClick: this.clearInput.bind(this), onMouseDown: this.clearInput.bind(this) }))
        ];
        if (cancelButton && this.mode === 'ios') {
            searchbar.push(cancelButton);
        }
        return searchbar;
    }
    static get is() { return "ion-searchbar"; }
    static get host() { return { "theme": "searchbar" }; }
    static get properties() { return { "activated": { "state": true }, "animated": { "type": Boolean, "attr": "animated" }, "autocomplete": { "type": String, "attr": "autocomplete" }, "autocorrect": { "type": String, "attr": "autocorrect" }, "cancelButtonText": { "type": String, "attr": "cancel-button-text" }, "color": { "type": String, "attr": "color" }, "debounce": { "type": Number, "attr": "debounce", "watchCallbacks": ["debounceChanged"] }, "el": { "elementRef": true }, "focused": { "state": true }, "mode": { "type": "Any", "attr": "mode" }, "placeholder": { "type": String, "attr": "placeholder" }, "showCancelButton": { "type": Boolean, "attr": "show-cancel-button" }, "spellcheck": { "type": Boolean, "attr": "spellcheck" }, "type": { "type": String, "attr": "type" }, "value": { "type": String, "attr": "value", "mutable": true } }; }
    static get events() { return [{ "name": "ionInput", "method": "ionInput", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionCancel", "method": "ionCancel", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionClear", "method": "ionClear", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionBlur", "method": "ionBlur", "bubbles": true, "cancelable": true, "composed": true }, { "name": "ionFocus", "method": "ionFocus", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "ion-searchbar {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  box-sizing: border-box;\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n\n.searchbar-icon {\n  pointer-events: none;\n}\n\n.searchbar-input-container {\n  position: relative;\n  display: block;\n  flex-shrink: 1;\n  width: 100%;\n}\n\n.searchbar-input {\n  -moz-appearance: none;\n  -ms-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n  box-sizing: border-box;\n  display: block;\n  width: 100%;\n  border: 0;\n  font-family: inherit;\n}\n\n.searchbar-input:active, .searchbar-input:focus {\n  outline: none;\n}\n\n.searchbar-input::-webkit-search-cancel-button {\n  display: none;\n}\n\n.searchbar-clear-icon {\n  margin: 0;\n  padding: 0;\n  display: none;\n  min-height: 0;\n}\n\n.searchbar-has-value.searchbar-has-focus .searchbar-clear-icon {\n  display: block;\n}\n\n.searchbar-md {\n  padding: 8px;\n  font-family: \"Roboto\", \"Helvetica Neue\", sans-serif;\n  background: inherit;\n}\n\n.searchbar-search-icon-md {\n  left: 16px;\n  top: 11px;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-text-md-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20d='M337.509,305.372h-17.501l-6.571-5.486c20.791-25.232,33.922-57.054,33.922-93.257C347.358,127.632,283.896,64,205.135,64C127.452,64,64,127.632,64,206.629s63.452,142.628,142.225,142.628c35.011,0,67.831-13.167,92.991-34.008l6.561,5.487v17.551L415.18,448L448,415.086L337.509,305.372z%20M206.225,305.372c-54.702,0-98.463-43.887-98.463-98.743c0-54.858,43.761-98.742,98.463-98.742c54.7,0,98.462,43.884,98.462,98.742C304.687,261.485,260.925,305.372,206.225,305.372z'/></svg>\");\n  width: 21px;\n  height: 21px;\n}\n\n.searchbar-cancel-button-md {\n  left: 10px;\n  top: 0;\n  margin: 0;\n  display: none;\n  height: 100%;\n  border: 0;\n  font-size: 1.8em;\n  color: var(--ion-text-md-color-step-100, var(--ion-text-color-step-100, #1a1a1a));\n  background-color: transparent;\n}\n\n.searchbar-search-icon-md,\n.searchbar-cancel-button-md {\n  position: absolute;\n  background-repeat: no-repeat;\n  background-size: 20px;\n}\n\n.searchbar-search-icon-md.activated,\n.searchbar-cancel-button-md.activated {\n  background-color: transparent;\n}\n\n.searchbar-md .searchbar-input {\n  padding: 6px 55px;\n  border-radius: 2px;\n  background-position: left 8px center;\n  height: auto;\n  font-size: 16px;\n  font-weight: 400;\n  line-height: 30px;\n  color: var(--ion-text-md-color-step-150, var(--ion-text-color-step-150, #262626));\n  background-color: var(--ion-background-md-color, var(--ion-background-color, #fff));\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n}\n\n.searchbar-md .searchbar-input::-moz-placeholder {\n  color: var(--ion-placeholder-text-md-color, var(--ion-placeholder-text-color, #999));\n}\n\n.searchbar-md .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-placeholder-text-md-color, var(--ion-placeholder-text-color, #999));\n}\n\n.searchbar-md .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-placeholder-text-md-color, var(--ion-placeholder-text-color, #999));\n}\n\n.searchbar-md .searchbar-clear-icon {\n  right: 13px;\n  top: 0;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><polygon%20fill='var(--ion-text-md-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20points='405,136.798%20375.202,107%20256,226.202%20136.798,107%20107,136.798%20226.202,256%20107,375.202%20136.798,405%20256,285.798%20375.202,405%20405,375.202%20285.798,256'/></svg>\");\n  padding: 0;\n  background-position: center;\n  position: absolute;\n  width: 22px;\n  height: 100%;\n  border: 0;\n  background-color: transparent;\n  background-repeat: no-repeat;\n  background-size: 22px;\n}\n\n.searchbar-md .searchbar-clear-icon.activated {\n  background-color: transparent;\n}\n\n.searchbar-has-focus.searchbar-show-cancel .searchbar-search-icon-md {\n  display: none;\n}\n\n.searchbar-has-focus.searchbar-show-cancel .searchbar-cancel-button-md {\n  display: inline-flex;\n}\n\n.toolbar .searchbar-md {\n  padding: 3px;\n}"; }
    static get styleMode() { return "md"; }
}

export { AppPlay, Card as IonCard, Footer as IonFooter, List as IonList, Searchbar as IonSearchbar };
