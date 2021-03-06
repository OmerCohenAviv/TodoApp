import React, { Component } from 'react';

import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Card from '../../components/UI/Card/Card';
import { cardData } from '../../utility/Configs/Configs'
import { updateObject, checkValid, updateElement} from '../../utility/sharedFunctions/sharedFunctions';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import SendButton from '../../components/UI/Buttons/sendButton/sendButton';

class Home extends Component {
    state = {...cardData }
              
    changeValueHandler = (event, elType) => {
        const valid = checkValid(this.state.cardData[elType].rules, event.target.value)
        const updatedElement = updateElement(event, elType, valid, this)
        const updateCardData = updateObject(this.state.cardData, { [elType]: updatedElement } )
        this.setState({ cardData: updateCardData })
    };

    postingDataHandler = (event) => {
        event.preventDefault();
        let todoDataArr = [];
        for (let el in this.state.cardData) {
            todoDataArr[el] = this.state.cardData[el].value
        };
        const todoData = { ...todoDataArr,  id: this.props.id }
        this.props.onPostData(todoData, this.props.token)
    };

    render() {
        let cardDataArr = [];
        for (let cardEl in this.state.cardData) {
            cardDataArr.push({
                id: cardEl,
                config: this.state.cardData[cardEl]
            });
        };

        let card = <Spinner />
        let disabled = true
        disabled = this.state.cardData['title'].valid && this.state.cardData['context'].valid && this.props.token !== null
        if (!this.props.loading) (
            card = (
                <Card> 
                       { cardDataArr.map(el => (
                            <Input
                                change={(event) => this.changeValueHandler(event, el.id)}
                                key={el.id}
                                elementType={el.config.elementType}
                                touched={el.config.touched}
                                valid={el.config.valid}
                                value={el.config.value}
                                elementConfig={el.config.elementConfig} //placeholder,type
                            />
                        )) }       
                    <SendButton
                        type={'primary'}
                        disabled={disabled}
                        clicked={this.postingDataHandler} >
                        {this.props.token ? 'Submit' : 'Login First '}
                    </SendButton>
                </Card>
            )
        )
    let style = { paddingTop: '45px' }

        return (
            <div style={style}>
                {card}
            </div>
        );
    };
};
const mapStateToProps = state => { return {
        loading: state.homeReducer.loading,
        token: state.authReducer.token,
        id: state.authReducer.id
    };
};

const mapDispatchToProps = dispatch => {
    return { onPostData: (data, token) => dispatch( actions.postTodoDataInit( data, token ) ) }   
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);