/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppMatch {
    constructor() {
        this.loading = true;
        this.isFinished = false;
        this.match = null;
        this.locals = null;
        this.visitors = null;
    }
    componentWillLoad() {
        this.matchRef = db.collection("matches").doc(this.matchId);
        this.matchRef.get().then((doc) => {
            if (doc.exists) {
                this.match = doc.data();
                this.locals = Object.assign({ score: 0, goals: [] }, this.match.locals);
                this.visitors = Object.assign({ score: 0, goals: [] }, this.match.visitors);
                if (this.match.endTime) {
                    this.isFinished = true;
                }
            }
            else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    score(teamName, player) {
        if (this.isFinished) {
            return;
        }
        const date = new Date(), time = date.getTime() - this.match.startTime, score = this[teamName].score + 1, team = Object.assign({}, this[teamName], { score });
        let endTime = null;
        this[teamName] = team;
        this[teamName].goals = [
            ...this[teamName].goals,
            {
                time,
                score: {
                    locals: this.locals.score,
                    visitors: this.visitors.score
                },
                player: { displayName: player.displayName, id: player.id }
            }
        ];
        if (this[teamName].score === 6) {
            this.isFinished = true;
            endTime = date;
        }
        this.matchRef.update({
            locals: this.locals,
            visitors: this.visitors,
            endTime
        });
    }
    getSummaryPlayer(team, player) {
        return h("div", { class: "player" },
            h("ion-avatar", { onClick: () => this.score(team, player) },
                h("img", { src: player ? player.imageURL : '/assets/images/default_avatar.jpg' })),
            h("span", null, player.displayName));
    }
    getGoals(team) {
        return team.goals.map((goal) => h("div", null,
            h("span", { class: "scorer" }, goal.player.displayName),
            h("span", { class: "partial" },
                goal.score.locals,
                "-",
                goal.score.visitors)));
    }
    renderSummary() {
        const locals = this.locals, visitors = this.visitors;
        return h("div", { class: "scoreboard" },
            h("div", { class: "team" }, [
                this.getSummaryPlayer('locals', locals.DEF),
                this.getSummaryPlayer('locals', locals.ATK)
            ]),
            h("div", { class: "score-wrapper" },
                h("span", { class: "score" },
                    locals.score,
                    " - ",
                    visitors.score),
                h("div", { class: "goals" },
                    h("div", { class: "locals" }, this.getGoals(locals)),
                    h("div", { class: "visitors" }, this.getGoals(visitors)))),
            h("div", { class: "team" }, [
                this.getSummaryPlayer('visitors', visitors.ATK),
                this.getSummaryPlayer('visitors', visitors.DEF)
            ]));
    }
    render() {
        return (h("ion-page", null, this.match ? this.renderSummary() : ''));
    }
    static get is() { return "app-match"; }
    static get properties() { return { "isFinished": { "state": true }, "loading": { "state": true }, "locals": { "state": true }, "match": { "state": true }, "matchId": { "type": String, "attr": "match-id" }, "visitors": { "state": true } }; }
    static get style() { return "app-match ion-page {\n  background: #3171e0;\n  background-image: url(http://e00-marca.uecdn.es/assets/v9/img/lives/eventBoardLive_on.jpg);\n  background-size: cover;\n  background-position: center;\n}\n\napp-match ion-page .scoreboard {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: white;\n  height: 100%;\n}\n\napp-match ion-page .scoreboard .team {\n  font-size: 35px;\n  font-weight: 500;\n  color: whitesmoke;\n  width: 215px;\n  height: 100%;\n}\n\napp-match ion-page .scoreboard .team ion-avatar {\n  border: 3px solid white;\n  width: 75px;\n  height: 75px;\n}\n\napp-match ion-page .scoreboard .team .player {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  text-align: center;\n  height: 50%;\n}\n\napp-match ion-page .scoreboard .team .player span {\n  margin-bottom: auto;\n}\n\napp-match ion-page .scoreboard .score-wrapper {\n  margin-bottom: auto;\n  margin-top: 50px;\n  flex-grow: 1;\n}\n\napp-match ion-page .scoreboard .score-wrapper .score {\n  font-size: 5em;\n  background: whitesmoke;\n  color: #464646;\n  border-radius: 30px;\n  width: 200px;\n  text-align: center;\n  font-weight: bold;\n  width: 200px;\n  display: block;\n  margin: 0 auto;\n}\n\napp-match ion-page .scoreboard .score-wrapper .goals {\n  display: flex;\n  justify-content: space-between;\n  font-size: 25px;\n}\n\napp-match ion-page .scoreboard .score-wrapper .goals .scorer {\n  color: yellow;\n}\n\napp-match ion-page .scoreboard .score-wrapper .goals > div {\n  width: 50%;\n}\n\napp-match ion-page .scoreboard .score-wrapper .goals > div.locals > div {\n  display: flex;\n}\n\napp-match ion-page .scoreboard .score-wrapper .goals > div.locals > div .scorer {\n  margin-left: auto;\n}\n\napp-match ion-page .scoreboard .score-wrapper .goals > div.locals > div .partial {\n  margin-right: 15px;\n  margin-left: 5px;\n}\n\napp-match ion-page .scoreboard .score-wrapper .goals > div.visitors > div {\n  display: flex;\n  flex-direction: row-reverse;\n}\n\napp-match ion-page .scoreboard .score-wrapper .goals > div.visitors > div .scorer {\n  margin-right: auto;\n}\n\napp-match ion-page .scoreboard .score-wrapper .goals > div.visitors > div .partial {\n  margin-right: 5px;\n  margin-left: 15px;\n}\n\n\@media screen and (max-width: 500px) {\n  app-match ion-page .scoreboard {\n    align-items: unset;\n  }\n  app-match ion-page .scoreboard .score-wrapper {\n    position: absolute;\n    width: 90%;\n    top: 30px;\n    margin-left: 5%;\n    margin-top: 0px;\n  }\n  app-match ion-page .scoreboard .team {\n    margin-top: 150px;\n  }\n  app-match ion-page .scoreboard .team .player {\n    height: 25%;\n  }\n}"; }
}

export { AppMatch };
