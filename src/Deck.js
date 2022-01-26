import { Component } from "react";
import axios from "axios";
import Card from "./Card.js"
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck/";


class Deck extends Component{
    constructor(props){
        super(props);

        this.state = {deck: null, drawn: []}
        this.getCard = this.getCard.bind(this)
    }

    async componentDidMount(){
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({deck: deck.data})
    }

    async getCard(){
        let id = this.state.deck.deck_id
        try{
            let cardURL = `${API_BASE_URL}/${id}/draw/`;
            let cardRes = await axios.get(cardURL);
            if(!cardRes.data.success) throw new Error("No Card Remaining");

        let card = cardRes.data.cards[0];
        this.setState(st => ({
            drawn: [
                ...st.drawn,
                {
                    id: card.code,
                    image: card.image,
                    name: `${card.suit} ${card.value}`,
                }
            ]
        }));
    } catch(err){
        alert(err)
    }
    }

    render(){
        const cards = this.state.drawn.map(c => (
            <Card key={c.id} name={c.name} image={c.image} />
        ));

        return(
            <div>
                <h1>Card Dealer</h1>
                {cards}
                <button onClick={this.getCard}>Get Card!</button>
            </div>
        )
    }
}

export default Deck;