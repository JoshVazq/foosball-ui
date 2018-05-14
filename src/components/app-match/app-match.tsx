import { Component, Prop, State } from '@stencil/core';
import { PLAYER_POSITION } from '../../helpers/utils';


declare var db;

@Component({
    tag: 'app-match',
    styleUrl: 'app-match.scss'
})
export class AppMatch {
    matchRef;
    @State() loading = true;
    @State() isFinished = false;
    @State() match = null;
    @State() locals = null;
    @State() visitors = null;
    @State() resets = [];
    @Prop() matchId: string;

    componentWillLoad() {
        this.matchRef = db.collection("matches").doc(this.matchId);
        this.matchRef.get().then((doc) => {
            if (doc.exists) {
                this.match = doc.data();
                this.locals = { score: 0, goals: [], ...this.match.locals };
                this.visitors = { score: 0, goals: [], ...this.match.visitors };
                this.resets = this.match.resets || [];
                if (this.match.endTime) {
                    this.isFinished = true;
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }

    async presentNewMatchAlert() {
        const alertController = document.querySelector('ion-alert-controller');
        await alertController.componentOnReady();

        const alert = await alertController.create({
            header: 'New Match',
            message: 'The last one?? ',
            buttons: [
                {
                    text: 'Same Teams',
                    handler: () => {
                        this.newMatch();
                    }
                }, {
                    text: 'New Teams',
                    handler: () => {
                        location.href = '/';
                    }
                }
            ]
        });
        return await alert.present();
    }
    async presentResetAlert() {
        const alertController = document.querySelector('ion-alert-controller');
        await alertController.componentOnReady();

        const alert = await alertController.create({
            header: 'Reset',
            message: 'Do you have the nuts to do it??',
            buttons: [{
                text: 'Reset',
                handler: () => {
                    this.resetGame();

                }
            },
            {
                text: 'I\'m a coward'
            }
            ]
        });
        return await alert.present();
    }
    score(teamName, player, position) {
        if (this.isFinished) {
            return;
        }
        const date = new Date(),
            time = date.getTime() - this.match.startTime,
            score = this[teamName].score + 1,
            team = {
                ...this[teamName],
                score,
            }
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
                player: { displayName: player.displayName, id: player.id, position }
            }
        ]
        if (this[teamName].score === 1 && this.locals.score === this.visitors.score) {
            if (!this.resets.length) {
                this.resetGame();
            }
            else {
                this.presentResetAlert();
            }
        } else
            if (this[teamName].score === 6) {
                this.isFinished = true;
                endTime = date;
            }
        this.matchRef.update({
            locals: this.locals,
            visitors: this.visitors,
            endTime
        }).then(() => {
            if (this.isFinished) {
                this.presentNewMatchAlert();
            }
        })
    }
    resetGame() {
        this.locals = { ...this.locals, score: 0 };
        this.visitors = { ...this.visitors, score: 0 };
        this.resets = [...this.resets, { time: new Date().getTime() - this.match.startTime }]
        this.matchRef.update({
            locals: this.locals,
            visitors: this.visitors,
            resets: this.resets
        })
    }
    newMatch() {
        db.collection("matches").add({
            startTime: new Date(),
            locals: { ...this.locals, score: 0, goals: [] },
            visitors: { ...this.visitors, score: 0, goals: [] },
        })
            .then(function (docRef) {
                const teamId = docRef.id;
                window.location.href = `/match/${teamId}`
            })
            .catch(function (error) {
                //TODO, handle error
                console.error("Error adding document: ", error);
            });
    }
    getSummaryPlayer(team, player, position) {
        return <div class="player">
            <ion-avatar onClick={() => this.score(team, player, position)}>
                <img src={player ? player.imageURL : '/assets/images/default_avatar.jpg'} />
            </ion-avatar>
            <span>
                {player.displayName}
            </span>
        </div>;

    }
    getGoals(team) {
        return team.goals.map((goal) => <div>
            <span class="scorer">{goal.player.displayName}</span>
            <span class="partial">{goal.score.locals}-{goal.score.visitors}</span>
        </div>);
    }
    renderSummary() {
        const locals = this.locals,
            visitors = this.visitors;
        return <div class="scoreboard">
            <ion-alert-controller></ion-alert-controller>
            <div class="team">
                {[
                    this.getSummaryPlayer('locals', locals.DEF, PLAYER_POSITION.DEF),
                    this.getSummaryPlayer('locals', locals.ATK, PLAYER_POSITION.ATK)
                ]}
            </div>
            <div class="score-wrapper">
                <span class="score">{locals.score} - {visitors.score}</span>
                <div class="goals">
                    <div class="locals">
                        {/* this.getGoals(locals) */}
                    </div>
                    <div class="visitors">
                        {/* this.getGoals(visitors) */}

                    </div>

                </div>
            </div>
            <div class="team">
                {[
                    this.getSummaryPlayer('visitors', visitors.ATK, PLAYER_POSITION.ATK),
                    this.getSummaryPlayer('visitors', visitors.DEF, PLAYER_POSITION.DEF)
                ]}
            </div>
        </div>;
    }
    render() {
        return (
            <ion-page>
                {this.match ? this.renderSummary() : ''}
            </ion-page>
        );
    }
}
