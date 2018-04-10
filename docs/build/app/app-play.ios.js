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
    static get style() { return "ion-card {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  position: relative;\n  display: block;\n  overflow: hidden;\n}\n\nion-card img {\n  display: block;\n  width: 100%;\n}\n\n.card-ios {\n  margin: 30px 20px;\n  border-radius: 8px;\n  width: calc(100% - 40px);\n  font-family: -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", \"Roboto\", sans-serif;\n  font-size: 14px;\n  color: var(--ion-text-ios-color-step-400, var(--ion-text-color-step-400, #666666));\n  background-color: var(--ion-item-ios-background-color, var(--ion-background-ios-color, var(--ion-background-color, #fff)));\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);\n  transform: translateZ(0);\n}\n\n.card-ios ion-list {\n  margin-bottom: 0;\n}\n\n.card-ios > .item:last-child,\n.card-ios > .item:last-child .item-inner,\n.card-ios > .item-sliding:last-child .item {\n  border-bottom: 0;\n}\n\n.card-ios .item-ios .item-inner {\n  border: 0;\n}\n\n.card .note-ios {\n  font-size: 13px;\n}\n\n.card-ios h1 {\n  margin: 0 0 2px;\n  font-size: 24px;\n  font-weight: normal;\n}\n\n.card-ios h2 {\n  margin: 2px 0;\n  font-size: 16px;\n  font-weight: normal;\n}\n\n.card-ios h3,\n.card-ios h4,\n.card-ios h5,\n.card-ios h6 {\n  margin: 2px 0;\n  font-size: 14px;\n  font-weight: normal;\n}\n\n.card-ios p {\n  margin: 0 0 2px;\n  font-size: 14px;\n  color: var(--ion-text-ios-color-step-400, var(--ion-text-color-step-400, #666666));\n}\n\n.card-ios .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-primary {\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  background-color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-primary p {\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n}\n\n.card-ios-primary .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-primary .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-primary .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-primary .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-primary .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-primary .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-primary .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-primary .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-primary .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-secondary {\n  color: var(--ion-color-ios-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n  background-color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-secondary p {\n  color: var(--ion-color-ios-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n}\n\n.card-ios-secondary .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-secondary .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-secondary .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-secondary .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-secondary .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-secondary .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-secondary .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-secondary .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-secondary .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-tertiary {\n  color: var(--ion-color-ios-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n  background-color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-tertiary p {\n  color: var(--ion-color-ios-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n}\n\n.card-ios-tertiary .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-tertiary .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-tertiary .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-tertiary .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-tertiary .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-tertiary .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-tertiary .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-tertiary .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-tertiary .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-success {\n  color: var(--ion-color-ios-success-contrast, var(--ion-color-success-contrast, #fff));\n  background-color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-success p {\n  color: var(--ion-color-ios-success-contrast, var(--ion-color-success-contrast, #fff));\n}\n\n.card-ios-success .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-success .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-success .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-success .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-success .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-success .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-success .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-success .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-success .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-warning {\n  color: var(--ion-color-ios-warning-contrast, var(--ion-color-warning-contrast, #000));\n  background-color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-warning p {\n  color: var(--ion-color-ios-warning-contrast, var(--ion-color-warning-contrast, #000));\n}\n\n.card-ios-warning .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-warning .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-warning .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-warning .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-warning .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-warning .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-warning .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-warning .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-warning .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-danger {\n  color: var(--ion-color-ios-danger-contrast, var(--ion-color-danger-contrast, #fff));\n  background-color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-danger p {\n  color: var(--ion-color-ios-danger-contrast, var(--ion-color-danger-contrast, #fff));\n}\n\n.card-ios-danger .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-danger .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-danger .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-danger .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-danger .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-danger .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-danger .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-danger .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-danger .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-light {\n  color: var(--ion-color-ios-light-contrast, var(--ion-color-light-contrast, #000));\n  background-color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-light p {\n  color: var(--ion-color-ios-light-contrast, var(--ion-color-light-contrast, #000));\n}\n\n.card-ios-light .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-light .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-light .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-light .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-light .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-light .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-light .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-light .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-light .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-medium {\n  color: var(--ion-color-ios-medium-contrast, var(--ion-color-medium-contrast, #000));\n  background-color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-medium p {\n  color: var(--ion-color-ios-medium-contrast, var(--ion-color-medium-contrast, #000));\n}\n\n.card-ios-medium .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-medium .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-medium .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-medium .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-medium .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-medium .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-medium .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-medium .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-medium .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios-dark {\n  color: var(--ion-color-ios-dark-contrast, var(--ion-color-dark-contrast, #fff));\n  background-color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.card-ios-dark p {\n  color: var(--ion-color-ios-dark-contrast, var(--ion-color-dark-contrast, #fff));\n}\n\n.card-ios-dark .text-ios-primary {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.card-ios-dark .text-ios-secondary {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.card-ios-dark .text-ios-tertiary {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.card-ios-dark .text-ios-success {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.card-ios-dark .text-ios-warning {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.card-ios-dark .text-ios-danger {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.card-ios-dark .text-ios-light {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.card-ios-dark .text-ios-medium {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.card-ios-dark .text-ios-dark {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}"; }
    static get styleMode() { return "ios"; }
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
    static get style() { return "ion-footer {\n  position: relative;\n  z-index: 10;\n  display: block;\n  order: 1;\n  width: 100%;\n}\n\n.footer-translucent-ios {\n  backdrop-filter: saturate(180%) blur(20px);\n}"; }
    static get styleMode() { return "ios"; }
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
    static get style() { return "ion-list {\n  margin: 0;\n  padding: 0;\n  display: block;\n  contain: content;\n  list-style-type: none;\n}\n\nion-list[inset] {\n  overflow: hidden;\n  transform: translateZ(0);\n}\n\n.list-ios {\n  margin: -1px 0 32px;\n}\n\n.list-ios .item[no-lines],\n.list-ios .item[no-lines] .item-inner {\n  border-width: 0;\n}\n\n.list-ios:not([inset]) + .list-ios:not([inset]) ion-list-header {\n  margin-top: -10px;\n  padding-top: 0;\n}\n\n.list-ios[inset] {\n  margin: 16px;\n  border-radius: 4px;\n}\n\n.list-ios[inset] ion-list-header {\n  background-color: var(--ion-item-ios-background-color, var(--ion-background-ios-color, var(--ion-background-color, #fff)));\n}\n\n.list-ios[inset] .item {\n  border-bottom: 1px solid var(--ion-item-ios-border-color, var(--ion-item-border-color, #c8c7cc));\n}\n\n.list-ios[inset] .item-inner {\n  border-bottom: 0;\n}\n\n.list-ios[inset] > ion-item:first-child .item,\n.list-ios[inset] > ion-item-sliding:first-child .item {\n  border-top: 0;\n}\n\n.list-ios[inset] > ion-item:last-child .item,\n.list-ios[inset] > ion-item-sliding:last-child .item {\n  border-bottom: 0;\n}\n\n.list-ios[inset] + ion-list[inset] {\n  margin-top: 0;\n}\n\n.list-ios[no-lines] ion-list-header,\n.list-ios[no-lines] .item,\n.list-ios[no-lines] .item-inner {\n  border-width: 0;\n}"; }
    static get styleMode() { return "ios"; }
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
    static get style() { return "ion-searchbar {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  box-sizing: border-box;\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n\n.searchbar-icon {\n  pointer-events: none;\n}\n\n.searchbar-input-container {\n  position: relative;\n  display: block;\n  flex-shrink: 1;\n  width: 100%;\n}\n\n.searchbar-input {\n  -moz-appearance: none;\n  -ms-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n  box-sizing: border-box;\n  display: block;\n  width: 100%;\n  border: 0;\n  font-family: inherit;\n}\n\n.searchbar-input:active, .searchbar-input:focus {\n  outline: none;\n}\n\n.searchbar-input::-webkit-search-cancel-button {\n  display: none;\n}\n\n.searchbar-clear-icon {\n  margin: 0;\n  padding: 0;\n  display: none;\n  min-height: 0;\n}\n\n.searchbar-has-value.searchbar-has-focus .searchbar-clear-icon {\n  display: block;\n}\n\n.searchbar-ios {\n  padding: 12px;\n  height: 60px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", \"Roboto\", sans-serif;\n  contain: strict;\n}\n\n.searchbar-ios .searchbar-input-container {\n  height: 36px;\n  contain: strict;\n}\n\n.searchbar-search-icon-ios {\n  background-position: center;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-text-ios-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-text-ios-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  margin-left: calc(50% - 60px);\n  left: 9px;\n  top: 0;\n  position: absolute;\n  width: 14px;\n  height: 100%;\n  background-repeat: no-repeat;\n  background-size: 13px;\n  contain: strict;\n}\n\n.searchbar-ios .searchbar-input {\n  padding: 0 28px;\n  border-radius: 10px;\n  height: 100%;\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--ion-text-ios-color, var(--ion-text-color, #000));\n  background-color: rgba(var(--ion-text-ios-color-rgb, var(--ion-text-color-rgb, 0, 0, 0)), 0.07);\n  contain: strict;\n}\n\n.searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-text-ios-color-step-400, var(--ion-text-color-step-400, #666666));\n}\n\n.searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-text-ios-color-step-400, var(--ion-text-color-step-400, #666666));\n}\n\n.searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-text-ios-color-step-400, var(--ion-text-color-step-400, #666666));\n}\n\n.searchbar-ios .searchbar-clear-icon {\n  right: 0;\n  top: 0;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-text-ios-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  background-position: center;\n  position: absolute;\n  width: 30px;\n  height: 100%;\n  border: 0;\n  background-color: transparent;\n  background-repeat: no-repeat;\n  background-size: 18px;\n}\n\n.searchbar-cancel-button-ios {\n  padding: 0 0 0 8px;\n  display: none;\n  flex-shrink: 0;\n  border: 0;\n  font-size: 16px;\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n  background-color: transparent;\n  cursor: pointer;\n}\n\n.searchbar-left-aligned .searchbar-search-icon-ios {\n  margin-left: 0;\n}\n\n.searchbar-ios.searchbar-left-aligned .searchbar-input {\n  padding-left: 30px;\n}\n\n.searchbar-show-cancel.searchbar-has-focus .searchbar-cancel-button-ios,\n.searchbar-show-cancel.searchbar-animated .searchbar-cancel-button-ios {\n  display: block;\n}\n\n.searchbar-animated .searchbar-search-icon-ios,\n.searchbar-ios.searchbar-animated .searchbar-input {\n  transition: all 300ms ease;\n}\n\n.searchbar-animated.searchbar-has-focus .searchbar-cancel-button-ios {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.searchbar-animated .searchbar-cancel-button-ios {\n  margin-right: -100%;\n  transform: translate3d(0,  0,  0);\n  opacity: 0;\n  transition: all 300ms ease;\n  pointer-events: none;\n}\n\n.searchbar-ios-primary .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-primary, var(--ion-color-primary, #3880ff));\n}\n\n.enable-hover .searchbar-ios-primary .searchbar-cancel-button-ios:hover {\n  color: var(--ion-color-ios-primary-tint, var(--ion-color-primary-tint, #4c8dff));\n}\n\n.toolbar-ios-primary .searchbar-search-icon-ios {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-primary-contrast,%20var(--ion-color-primary-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-primary-contrast,%20var(--ion-color-primary-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-primary .searchbar-ios .searchbar-input {\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  background: rgba(var(--ion-color-ios-primary-contrast-rgb, var(--ion-color-primary-contrast-rgb, 255, 255, 255)), 0.07);\n}\n\n.toolbar-ios-primary .searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-primary .searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-primary .searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-primary .searchbar-ios .searchbar-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-primary-contrast,%20var(--ion-color-primary-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-primary .searchbar-ios .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-primary-contrast, var(--ion-color-primary-contrast, #fff));\n}\n\n.searchbar-ios-secondary .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-secondary, var(--ion-color-secondary, #0cd1e8));\n}\n\n.enable-hover .searchbar-ios-secondary .searchbar-cancel-button-ios:hover {\n  color: var(--ion-color-ios-secondary-tint, var(--ion-color-secondary-tint, #24d6ea));\n}\n\n.toolbar-ios-secondary .searchbar-search-icon-ios {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-secondary-contrast,%20var(--ion-color-secondary-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-secondary-contrast,%20var(--ion-color-secondary-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-secondary .searchbar-ios .searchbar-input {\n  color: var(--ion-color-ios-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n  background: rgba(var(--ion-color-ios-secondary-contrast-rgb, var(--ion-color-secondary-contrast-rgb, 255, 255, 255)), 0.07);\n}\n\n.toolbar-ios-secondary .searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-color-ios-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-secondary .searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-color-ios-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-secondary .searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-color-ios-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-secondary .searchbar-ios .searchbar-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-secondary-contrast,%20var(--ion-color-secondary-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-secondary .searchbar-ios .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-secondary-contrast, var(--ion-color-secondary-contrast, #fff));\n}\n\n.searchbar-ios-tertiary .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-tertiary, var(--ion-color-tertiary, #7044ff));\n}\n\n.enable-hover .searchbar-ios-tertiary .searchbar-cancel-button-ios:hover {\n  color: var(--ion-color-ios-tertiary-tint, var(--ion-color-tertiary-tint, #7e57ff));\n}\n\n.toolbar-ios-tertiary .searchbar-search-icon-ios {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-tertiary-contrast,%20var(--ion-color-tertiary-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-tertiary-contrast,%20var(--ion-color-tertiary-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-tertiary .searchbar-ios .searchbar-input {\n  color: var(--ion-color-ios-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n  background: rgba(var(--ion-color-ios-tertiary-contrast-rgb, var(--ion-color-tertiary-contrast-rgb, 255, 255, 255)), 0.07);\n}\n\n.toolbar-ios-tertiary .searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-color-ios-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-tertiary .searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-color-ios-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-tertiary .searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-color-ios-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-tertiary .searchbar-ios .searchbar-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-tertiary-contrast,%20var(--ion-color-tertiary-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-tertiary .searchbar-ios .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-tertiary-contrast, var(--ion-color-tertiary-contrast, #fff));\n}\n\n.searchbar-ios-success .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-success, var(--ion-color-success, #10dc60));\n}\n\n.enable-hover .searchbar-ios-success .searchbar-cancel-button-ios:hover {\n  color: var(--ion-color-ios-success-tint, var(--ion-color-success-tint, #28e070));\n}\n\n.toolbar-ios-success .searchbar-search-icon-ios {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-success-contrast,%20var(--ion-color-success-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-success-contrast,%20var(--ion-color-success-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-success .searchbar-ios .searchbar-input {\n  color: var(--ion-color-ios-success-contrast, var(--ion-color-success-contrast, #fff));\n  background: rgba(var(--ion-color-ios-success-contrast-rgb, var(--ion-color-success-contrast-rgb, 255, 255, 255)), 0.07);\n}\n\n.toolbar-ios-success .searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-color-ios-success-contrast, var(--ion-color-success-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-success .searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-color-ios-success-contrast, var(--ion-color-success-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-success .searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-color-ios-success-contrast, var(--ion-color-success-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-success .searchbar-ios .searchbar-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-success-contrast,%20var(--ion-color-success-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-success .searchbar-ios .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-success-contrast, var(--ion-color-success-contrast, #fff));\n}\n\n.searchbar-ios-warning .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-warning, var(--ion-color-warning, #ffce00));\n}\n\n.enable-hover .searchbar-ios-warning .searchbar-cancel-button-ios:hover {\n  color: var(--ion-color-ios-warning-tint, var(--ion-color-warning-tint, #ffd31a));\n}\n\n.toolbar-ios-warning .searchbar-search-icon-ios {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-warning-contrast,%20var(--ion-color-warning-contrast,%20%23000))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-warning-contrast,%20var(--ion-color-warning-contrast,%20%23000))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-warning .searchbar-ios .searchbar-input {\n  color: var(--ion-color-ios-warning-contrast, var(--ion-color-warning-contrast, #000));\n  background: rgba(var(--ion-color-ios-warning-contrast-rgb, var(--ion-color-warning-contrast-rgb, 0, 0, 0)), 0.07);\n}\n\n.toolbar-ios-warning .searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-color-ios-warning-contrast, var(--ion-color-warning-contrast, #000));\n  opacity: 0.5;\n}\n\n.toolbar-ios-warning .searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-color-ios-warning-contrast, var(--ion-color-warning-contrast, #000));\n  opacity: 0.5;\n}\n\n.toolbar-ios-warning .searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-color-ios-warning-contrast, var(--ion-color-warning-contrast, #000));\n  opacity: 0.5;\n}\n\n.toolbar-ios-warning .searchbar-ios .searchbar-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-warning-contrast,%20var(--ion-color-warning-contrast,%20%23000))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-warning .searchbar-ios .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-warning-contrast, var(--ion-color-warning-contrast, #000));\n}\n\n.searchbar-ios-danger .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-danger, var(--ion-color-danger, #f04141));\n}\n\n.enable-hover .searchbar-ios-danger .searchbar-cancel-button-ios:hover {\n  color: var(--ion-color-ios-danger-tint, var(--ion-color-danger-tint, #f25454));\n}\n\n.toolbar-ios-danger .searchbar-search-icon-ios {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-danger-contrast,%20var(--ion-color-danger-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-danger-contrast,%20var(--ion-color-danger-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-danger .searchbar-ios .searchbar-input {\n  color: var(--ion-color-ios-danger-contrast, var(--ion-color-danger-contrast, #fff));\n  background: rgba(var(--ion-color-ios-danger-contrast-rgb, var(--ion-color-danger-contrast-rgb, 255, 255, 255)), 0.07);\n}\n\n.toolbar-ios-danger .searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-color-ios-danger-contrast, var(--ion-color-danger-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-danger .searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-color-ios-danger-contrast, var(--ion-color-danger-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-danger .searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-color-ios-danger-contrast, var(--ion-color-danger-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-danger .searchbar-ios .searchbar-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-danger-contrast,%20var(--ion-color-danger-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-danger .searchbar-ios .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-danger-contrast, var(--ion-color-danger-contrast, #fff));\n}\n\n.searchbar-ios-light .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-light, var(--ion-color-light, #f4f5f8));\n}\n\n.enable-hover .searchbar-ios-light .searchbar-cancel-button-ios:hover {\n  color: var(--ion-color-ios-light-tint, var(--ion-color-light-tint, #f5f6f9));\n}\n\n.toolbar-ios-light .searchbar-search-icon-ios {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-light-contrast,%20var(--ion-color-light-contrast,%20%23000))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-light-contrast,%20var(--ion-color-light-contrast,%20%23000))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-light .searchbar-ios .searchbar-input {\n  color: var(--ion-color-ios-light-contrast, var(--ion-color-light-contrast, #000));\n  background: rgba(var(--ion-color-ios-light-contrast-rgb, var(--ion-color-light-contrast-rgb, 0, 0, 0)), 0.07);\n}\n\n.toolbar-ios-light .searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-color-ios-light-contrast, var(--ion-color-light-contrast, #000));\n  opacity: 0.5;\n}\n\n.toolbar-ios-light .searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-color-ios-light-contrast, var(--ion-color-light-contrast, #000));\n  opacity: 0.5;\n}\n\n.toolbar-ios-light .searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-color-ios-light-contrast, var(--ion-color-light-contrast, #000));\n  opacity: 0.5;\n}\n\n.toolbar-ios-light .searchbar-ios .searchbar-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-light-contrast,%20var(--ion-color-light-contrast,%20%23000))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-light .searchbar-ios .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-light-contrast, var(--ion-color-light-contrast, #000));\n}\n\n.searchbar-ios-medium .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-medium, var(--ion-color-medium, #989aa2));\n}\n\n.enable-hover .searchbar-ios-medium .searchbar-cancel-button-ios:hover {\n  color: var(--ion-color-ios-medium-tint, var(--ion-color-medium-tint, #a2a4ab));\n}\n\n.toolbar-ios-medium .searchbar-search-icon-ios {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-medium-contrast,%20var(--ion-color-medium-contrast,%20%23000))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-medium-contrast,%20var(--ion-color-medium-contrast,%20%23000))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-medium .searchbar-ios .searchbar-input {\n  color: var(--ion-color-ios-medium-contrast, var(--ion-color-medium-contrast, #000));\n  background: rgba(var(--ion-color-ios-medium-contrast-rgb, var(--ion-color-medium-contrast-rgb, 0, 0, 0)), 0.07);\n}\n\n.toolbar-ios-medium .searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-color-ios-medium-contrast, var(--ion-color-medium-contrast, #000));\n  opacity: 0.5;\n}\n\n.toolbar-ios-medium .searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-color-ios-medium-contrast, var(--ion-color-medium-contrast, #000));\n  opacity: 0.5;\n}\n\n.toolbar-ios-medium .searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-color-ios-medium-contrast, var(--ion-color-medium-contrast, #000));\n  opacity: 0.5;\n}\n\n.toolbar-ios-medium .searchbar-ios .searchbar-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-medium-contrast,%20var(--ion-color-medium-contrast,%20%23000))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-medium .searchbar-ios .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-medium-contrast, var(--ion-color-medium-contrast, #000));\n}\n\n.searchbar-ios-dark .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-dark, var(--ion-color-dark, #222428));\n}\n\n.enable-hover .searchbar-ios-dark .searchbar-cancel-button-ios:hover {\n  color: var(--ion-color-ios-dark-tint, var(--ion-color-dark-tint, #383a3e));\n}\n\n.toolbar-ios-dark .searchbar-search-icon-ios {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2013%2013'><path%20fill='var(--ion-color-ios-dark-contrast,%20var(--ion-color-dark-contrast,%20%23fff))'%20d='M5,1c2.2,0,4,1.8,4,4S7.2,9,5,9S1,7.2,1,5S2.8,1,5,1%20M5,0C2.2,0,0,2.2,0,5s2.2,5,5,5s5-2.2,5-5S7.8,0,5,0%20L5,0z'/><line%20stroke='var(--ion-color-ios-dark-contrast,%20var(--ion-color-dark-contrast,%20%23fff))'%20stroke-miterlimit='10'%20x1='12.6'%20y1='12.6'%20x2='8.2'%20y2='8.2'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-dark .searchbar-ios .searchbar-input {\n  color: var(--ion-color-ios-dark-contrast, var(--ion-color-dark-contrast, #fff));\n  background: rgba(var(--ion-color-ios-dark-contrast-rgb, var(--ion-color-dark-contrast-rgb, 255, 255, 255)), 0.07);\n}\n\n.toolbar-ios-dark .searchbar-ios .searchbar-input::-moz-placeholder {\n  color: var(--ion-color-ios-dark-contrast, var(--ion-color-dark-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-dark .searchbar-ios .searchbar-input:-ms-input-placeholder {\n  color: var(--ion-color-ios-dark-contrast, var(--ion-color-dark-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-dark .searchbar-ios .searchbar-input::-webkit-input-placeholder {\n  text-indent: 0;\n  color: var(--ion-color-ios-dark-contrast, var(--ion-color-dark-contrast, #fff));\n  opacity: 0.5;\n}\n\n.toolbar-ios-dark .searchbar-ios .searchbar-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-color-ios-dark-contrast,%20var(--ion-color-dark-contrast,%20%23fff))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");\n  opacity: 0.5;\n}\n\n.toolbar-ios-dark .searchbar-ios .searchbar-cancel-button-ios {\n  color: var(--ion-color-ios-dark-contrast, var(--ion-color-dark-contrast, #fff));\n}"; }
    static get styleMode() { return "ios"; }
}

export { AppPlay, Card as IonCard, Footer as IonFooter, List as IonList, Searchbar as IonSearchbar };
