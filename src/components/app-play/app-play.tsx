import { Component, Prop, State } from '@stencil/core';
import { ToastController } from '@ionic/core';


declare var db;
@Component({
  tag: 'app-play',
  styleUrl: 'app-play.scss'
})
export class AppPlay {
  playersPositions = ['DEF', 'ATK', 'ATK', 'DEF'];
  @State() loading = true;
  @State() users: Array<any>;
  @State() filteredPersons: Array<any>;
  @State() players = [null, null, null, null];
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  componentWillLoad() {
    db.collection("users").get().then((querySnapshot) => {
      const users = []
      querySnapshot.forEach((doc) => {
        const user = { ...doc.data(), id: doc.id };
        user.displayName = user.nickname ? user.nickname : (`${user.name} ${user.surname}`)
        users.push(user);
      })
      this.users = users;
      this.search('');
      this.loading = false;
    });
  }
  search(input) {
    const searchTerm = input.value;
    const regExp = new RegExp(searchTerm, "i")
    if (searchTerm) {
      this.filteredPersons = this.users.filter(person => (person.name.search(regExp) !== -1 || person.surname.search(regExp) !== -1 || person.nickname.search(regExp) !== -1));
    } else {
      this.filteredPersons = this.users;
    }

  }
  getPositionStyle(index, userId) {
    const player = this.players[index];
    return player && player.id === userId ? 'solid' : 'clear'
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
    })
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
        window.location.href = `match/${teamId}`
      })
      .catch(function (error) {
        //TODO, handle error
        console.error("Error adding document: ", error);
      });
  }
  renderUserList() {
    return <ion-list class="users">
      {
        this.filteredPersons.map((user) => <ion-item>
          <ion-avatar>
            <img src={user.imageURL} />
          </ion-avatar>
          {user.displayName}
          <div class="positions">
            {
              this.playersPositions.map((position, i) => {
                return <ion-button round
                  onClick={() => this.selectPlayer(i, user)}
                  fill={this.getPositionStyle(i, user.id)}>{position}</ion-button>
              })
            }
          </div>
        </ion-item>)
      }
    </ion-list>;
  }
  getSummaryPlayer(index) {
    const player = this.players[index];
    return <div class="player">
      <ion-avatar>
        <img src={player ? player.imageURL : '/assets/images/default_avatar.jpg'} />
      </ion-avatar>
      <span>
        {player ? player.displayName : ''}
      </span>
    </div>;

  }
  renderSummary() {
    return <ion-card class="summary">
      <form onSubmit={(e) => this.startMatch(e)}>
        <div class="players">
          <div class="team">
            {this.getSummaryPlayer(0)}
            {this.getSummaryPlayer(1)}
          </div>
          <span class="versus">VS</span>
          <div class="team">
            {this.getSummaryPlayer(2)}
            {this.getSummaryPlayer(3)}
          </div>
        </div>
        <ion-button expand="full" type="submit"
          disabled={this.players.some((player) => !player)}
        >Start Match</ion-button>
      </form>
    </ion-card>;
  }
  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='primary'>
            <ion-title>New Match</ion-title>
          </ion-toolbar>
        </ion-header>

        {!this.loading ? (this.users.length ? [
          <ion-searchbar onIonInput={(e) => this.search(e.target)}></ion-searchbar>
          ,
          <ion-content>
            {this.renderUserList()}
          </ion-content>,
          <ion-footer>
            {this.renderSummary()}
          </ion-footer>
        ] : <ion-content>Not users yet</ion-content>) : <ion-content>Loading Users</ion-content>

        }


      </ion-page>
    );
  }
}
