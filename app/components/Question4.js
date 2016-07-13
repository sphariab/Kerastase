'use strict'
import Parse from 'parse';
import React from 'react';
import { Link } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';

import Header from './Header';
import TitleComponent from './TitleComponent';
import NextLink from './NextLink';
import ActiveCounterRound from './ActiveCounterRound';
import CounterRound from './CounterRound';
import HorizontalLine from './HorizontalLine';

import '../styles/Question.css';
require('../styles/Counter.css');
import '../styles/Main.css';
import '../styles/CheckBox.css';

var ParseQuestions = Parse.Object.extend('Questions');


var Question4 = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pageNumber:'4',
            selectOptions: [],
            firstSelectOptions: [],
            answers:[]
        };
    },

    componentWillMount() {
        this.getAnswers('JGBcf9yXN7', 'first');
        $("#app").height('auto');
    },

    onAnswerSelected(event, currentAnswer) {
        currentAnswer = event.currentTarget.textContent;
        if (this.state.answers.length > 0) {
            this.state.answers.splice(0, 1);
        }
        this.state.answers.push(currentAnswer);
        this.setState({
            answers:this.state.answers
        });
        console.log(this.state.answers);
    },

    getAnswers(id, selectOption) {
        var _this = this;
        var query = new Parse.Query(ParseQuestions);
        query.equalTo('objectId', id);
        query.include('answers');
        query.first().then(
            (questions) => {
                var options = questions.get('answers'); 
                if (selectOption === 'first') {
                    _this.setState({
                        firstSelectOptions: options.map((option) => option.get('title'))
                    });
                }

                }, (error) => {
                    console.log('Error getting products');
                    console.log(error);
                }
            ) 
    },
     
    render: function() { 
        var text = 'If you had to choose one, what would be you main hair concern today ?';
        var firstSelectOptions = this.state.firstSelectOptions;
        var arrayFirstHalf = [];
        var arraySecondHalf = [];
        var el;
        for (var i=0; i < Math.ceil(firstSelectOptions.length / 2);  i++) { 
            el = <div className="checkOption" key={Math.random()} >
                    <input type="checkbox" className="checkbox" id={firstSelectOptions[i]}/>
                    <label className="checkboxLabel" onClick={this.onAnswerSelected} htmlFor={firstSelectOptions[i]}>
                        {firstSelectOptions[i]} 
                    </label>
                </div> 
            arrayFirstHalf.push(el);                
        }

        for (  var j = Math.ceil(firstSelectOptions.length / 2); j < firstSelectOptions.length; j++) {
            el = <div className="checkOption" key={Math.random()}>
            <input type="checkbox" className="checkbox" value={firstSelectOptions[j]} id={firstSelectOptions[j]} key={Math.random()}/>
            <label onClick={this.onAnswerSelected} className="checkboxLabel" htmlFor={firstSelectOptions[j]} key={Math.random()}>
                {firstSelectOptions[j]} 
            </label>   
                </div>   
            arraySecondHalf.push(el);                
        }

        return (
            <div className="wrapperPhrase question4_wrapper">
                <Header />
                <TitleComponent pageNumber={this.state.pageNumber} text={text}/>
                <div className="question-wrapper">
                    <div className="question-text_wrapper multiple">
                        <div className="question-text checkOption-wrapper"> 
                            {arrayFirstHalf}  
                        </div> 
                        <div className="question-text checkOption-wrapper"> 
                            {arraySecondHalf}  
                        </div>                       
                    </div>
                    <div className="wrapper-counter">
                        <Link to="/question/1" className="round" ></Link>   
                        <HorizontalLine />
                        <Link to="/question/2" className="round" ></Link> 
                        <HorizontalLine />
                        <Link to="/question/3" className="round" ></Link>  
                        <HorizontalLine />
                        <Link to="/question/4" className="activeRound" ></Link>
                        <HorizontalLine />
                        <Link to="/question/5" className="round" ></Link>
                        <HorizontalLine />
                        <Link to="/question/6" className="round" ></Link>
                        <HorizontalLine />
                        <Link to="/question/7" className="round" ></Link>
                        <HorizontalLine />
                        <Link to="/question/8" className="round" ></Link>
                        <HorizontalLine />
                        <Link to="/question/9" className="round"></Link>
                        <HorizontalLine />
                        <Link to="/question/10" className="round" ></Link>
                    </div>
                </div>
                <div className="wrapperNext">
                    <div className="linkText" onClick={this.onAnswerSelected}>Next</div>
                    <Link className="linkArrow" to="/question/5">
                    </Link>
                </div>
            </div>
        );
    }
});

module.exports = Question4;