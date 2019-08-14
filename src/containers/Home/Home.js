import React, { Component } from 'react';
import Radium from 'radium'

import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';
import { updateObject, checkValid } from '../../sharedFunctions/sharedFunctions';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

// import Modal from '../../components/UI/Modal/Modal';



class Home extends Component {
    state = {
        cardData: {
            title: {
                elementType: 'input',
                elementConfig: {
                    label: 'Title',
                    type: 'text',
                    placeholder: 'Title'
                },
                rules: {
                    required: true
                },
                value: '',
                valid: false,
                touched: false,
            },
            context: {
                elementType: 'textarea',
                elementConfig: {
                    label: 'Context',
                    type: 'text',
                    placeholder: 'context'
                },
                rules: {
                    required: true
                },
                value: '',
                valid: false,
                touched: false,
            },
            importantcy: {
                elementType: 'select',
                elementConfig: {
                    label: 'Important',
                    options: [
                        { value: 'high', displayValue: 'High' },
                        { value: 'medium', displayValue: 'Medium' },
                        { value: 'low', displayValue: 'Low' }
                    ]

                },
                rules: {
                    required: null
                },
                value: 'high',
                valid: true,
            },
        },
        progressTodo: false,
        cardValdiation: false
    };


    changeValueHandler = (event, elType) => {
        const valid = checkValid(this.state.cardData[elType].rules, event.target.value)
        const updateElement = updateObject(this.state.cardData[elType], {
            value: event.target.value,
            touched: true,
            valid: valid
        });
        const updateCardData = updateObject(this.state.cardData, {
            [elType]: updateElement
        })
        this.setState({ cardData: updateCardData })
    }

    postingDataHandler = (event) => {
        event.preventDefault();
        let todoDataArr = [];
        for (let el in this.state.cardData) {
            todoDataArr[el] = this.state.cardData[el].value
        };
        const todoData = {
            ...todoDataArr
        }
        this.props.onPostData(todoData)
    };

    render() {
        const styles = {
            hoverLight: {
                ':hover': {
                    color: 'black',
                    backgroundColor: 'yellow',
                }
            }
        };
        
        let cardDataArr = [];
        for (let cardEl in this.state.cardData) {
            cardDataArr.push({
                id: cardEl,
                config: this.state.cardData[cardEl]
            });
        };

        let card = <Spinner />
        if (!this.props.loading) (
            card = (
                <Card>
                    {
                        cardDataArr.map(el => (
                            <Input
                                change={(event) => this.changeValueHandler(event, el.id)}
                                key={el.id}
                                elementType={el.config.elementType}
                                touched={el.config.touched}
                                valid={el.config.valid}
                                value={el.config.value}
                                elementConfig={el.config.elementConfig} //placeholder,type
                            />
                        ))
                    }
                    <Button
                        style={styles.hoverLight}
                        clicked={this.postingDataHandler}
                        btnType='Success'> Submit </Button>
                </Card>
            )
        )

        let style = {
            paddingTop: '45px',
        }
        return (
            <div style={style}>
                {card}
            </div>
        );
    };
};
const mapStateToProps = state => {
    return {
        loading: state.homeReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostData: (data) => dispatch(actions.postTodoDataInit(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Home));