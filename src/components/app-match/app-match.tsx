import { Component, Prop, State } from '@stencil/core';


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
    @Prop() matchId: string;

    componentWillLoad() {
        this.matchRef = db.collection("matches").doc(this.matchId);
        this.matchRef.get().then((doc) => {
            if (doc.exists) {
                this.match = doc.data();
                this.locals = { score: 0, goals: [], ...this.match.locals };
                this.visitors = { score: 0, goals: [], ...this.match.visitors };
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
    score(teamName, player) {
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
                player: { displayName: player.displayName, id: player.id }
            }
        ]
        if (this[teamName].score === 6) {
            this.isFinished = true;
            endTime = date;
        }
        this.matchRef.update({
            locals: this.locals,
            visitors: this.visitors,
            endTime
        })
    }
    getSummaryPlayer(team, player) {
        return <div class="player">
            <ion-avatar onClick={() => this.score(team, player)}>
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
            <div class="team">
                {[
                    this.getSummaryPlayer('locals', locals.DEF),
                    this.getSummaryPlayer('locals', locals.ATK)
                ]}
            </div>
            <div class="score-wrapper">
                <span class="score">{locals.score} - {visitors.score}</span>
                <div class="goals">
                    <div class="locals">
                        {this.getGoals(locals)}
                    </div>
                    <div class="visitors">
                        {this.getGoals(visitors)}

                    </div>

                </div>
            </div>
            <div class="team">
                {[
                    this.getSummaryPlayer('visitors', visitors.ATK),
                    this.getSummaryPlayer('visitors', visitors.DEF)
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
