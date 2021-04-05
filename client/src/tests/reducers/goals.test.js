import reducer from './../../reducers/goals';
import * as actionTypes from '../../constants/goalsActionTypes';
import chai from 'chai';
const expect = chai.expect;

describe('Goals Reducer', () => {

    let initialState = [
        {
            _id: 1,
            testField: '1x',
        },
        {
            _id: 2,
            testField: '2x',
        },
    ];
    let nextState;

    it('handles action with unknown type', function() {
        expect(reducer(initialState, {})).to.equal(initialState);
    });

    //No state made for this

    // it(actionTypes.CREATE, function() {

    //     const action = { 

    //         type: actionTypes.CREATE, 

    //         payload: {
    //             _id: 3,
    //             testField: '3x',
    //         }
    //     };
    //     nextState = reducer(initialState, action);
    //     expect(nextState.length).to.equal(initialState.length + 1);
    //     expect(nextState[nextState.length - 1]).to.equal(action.payload);
    // });

    it(actionTypes.FETCH_ALL, function() {

        const action = { 

            type: actionTypes.FETCH_ALL, 
            payload:[{
                _id: 10,
                testField: '10x',
            },
            {
                _id: 20,
                testField: '20x',
            }]
        };
        nextState = reducer([], action);
        expect(nextState.length).to.equal(action.payload.length);
        expect(nextState[0]).to.deep.equal(action.payload[0]);
    });

    //No state made for this

    // it(actionTypes.FETCH, function() {

    //     const action = { 

    //         type: actionTypes.FETCH, 
    //         payload: {
    //             _id: 1,
    //             testField: '1x',
    //         }
    //     };
    //     nextState = reducer(initialState, action);
    //     expect(nextState).to.deep.equal({
    //         _id: 1,
    //         testField: '1x',
    //     });
    // });

    it(actionTypes.UPDATE, function() {

        const action = { 

            type: actionTypes.UPDATE, 
            payload: {
                _id: 1,
                testField: '1xx',
            }
        };
        nextState = reducer(initialState, action);
        expect(nextState[0].testField).to.equal('1xx');
        expect(nextState[0]).to.not.deep.equal(initialState[0]);
        expect(nextState.length).to.equal(initialState.length);
        expect(nextState[1]).to.deep.equal(initialState[1]);
    });

    it(actionTypes.DELETE, function() {

        const action = { 

            type: actionTypes.DELETE, 
            payload: 1
        };
        nextState = reducer(initialState, action);
        expect(nextState[0]._id).to.equal(2);
        expect(nextState.length).to.equal(initialState.length - 1);
        expect(nextState[0]).to.deep.equal(initialState[1]);
    });
});