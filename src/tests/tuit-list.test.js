import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

// jest.mock('axios');

const MOCKED_USERS = [
    "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
    "alice's tuit", "bob's tuit", "charlie's tuit"
];


const sampleTuit = [...Array(MOCKED_TUITS.length).keys()]
    .map(idx => {
        return {
            _id: idx + 1,
            tuit: MOCKED_TUITS[idx],
            postedBY: MOCKED_USERS[idx]
        }
    })

// sample tuit to insert
// const sampleTuit = [{
//     _id: '1',
//     tuit: 'alice\'s tuit',
//     postedBy:"alice"
// }, {
//     _id: '2',
//     tuit: 'bob\'s tuit.',
//     postedBy: "bob"
// }, {
//     _id: '3',
//     tuit: 'charlie\'s tuit.',
//     postedBy: "charlie"
// },
// ];

test('tuit list renders static tuit array', async () => {
    render(
        <HashRouter>
            <Tuits tuits={sampleTuit}/>
        </HashRouter>);
    const linkElement = await screen.findAllByText(/tuit/i);
    expect(linkElement.length).toEqual(3);
});

test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    )
    const linkElement = screen.getByText(/cici/i);
    expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
    // only mock the required functions
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
                                Promise.resolve({data:  sampleTuit}));

    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    )
    const linkElement = await screen.findAllByText(/tuit/i);
    expect(linkElement.length).toEqual(3);
});
