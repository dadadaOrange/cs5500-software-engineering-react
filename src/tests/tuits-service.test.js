import {
    findAllTuits,
    findTuitById,
    createTuit,
    deleteTuitById
} from "../services/tuits-service";

jest.useRealTimers();

describe('createTuit', () => {
    const BobId = '6205d2b57556e383c20128d4';
    // sample tuit to insert
    const sampleTuit = {
        id: '1',
        tuit: 'This is a test tuit.'
    };

    // setup test before running test
    beforeAll(() => {
        // remove any/all tuits to make sure we create it in the test
        return deleteTuitById(sampleTuit.id);
    });

    // clean up after test runs
    afterAll(() => {
        //remove any data we created
        return deleteTuitById(sampleTuit.id);
    });

    test('can create tuit with REST API', async () => {
        // insert new tuit for this user
        const newTuit = await createTuit(BobId, sampleTuit);

        //verify inserted tuit's properties match parameter tuit
        expect(newTuit.id).toEqual(sampleTuit.id);
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(BobId);
    });
});

describe('deleteTuit', () => {
    // create a sample user
    const BobId = '6205d2b57556e383c20128d4';
    // sample tuit to insert
    const sampleTuit = {
        id: '1',
        tuit: 'This is a test tuit.'
    };

    // setup the tests before verification
    beforeAll(() => {
        // insert the sample tuit we then try to remove
        return createTuit(BobId, sampleTuit);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuitById(sampleTuit.id);
    })

    test('can delete tuit wtih REST API', async () => {
        // delete a tuit by their id. Assumes tuit already exists
        const status = await deleteTuitById(sampleTuit.id);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('findTuitById', () => {
    const BobId = '6205d2b57556e383c20128d4';
    const sampleTuit = {
        id: '1',
        tuit: 'This is a test tuit.'
    };

    // setup before running test
    beforeAll(() => {
        // clean up before the test making sure the tuit doesn't already exist
        return deleteTuitById(sampleTuit.id)
    });

    // clean up after test
    afterAll(() => {
        // remove any data we inserted
        return deleteTuitById(sampleTuit.id)
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {
        //insert a tuit into database
        const newTuit = await createTuit(BobId, sampleTuit);

        // verify new tuit matches the parameter tuit
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(BobId);

        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter tuit
        expect(existingTuit.tuit).toEqual(sampleTuit.tuit);
        expect(existingTuit.postedBy._id).toEqual(BobId);
    });
});

describe('findAllTuits', () => {
    //sample tuits we will insert into then retrieve
    const tuits = [
        {
            "id": '0',
            "tuit": "test tuit 0"
        },
        {
            "id": '1',
            "tuit": "test tuit 1"
        },
        {
            "id": '2',
            "tuit": "test tuit 2"
        }
    ]

    const BobId = '6205d2b57556e383c20128d4';
    //setup data before test
    beforeAll(() => {
        tuits.map(tuit =>
                  createTuit({
                     uid: BobId,
                     tuit: tuit
         })
        )
    });

    //clean up after test
    afterAll(() =>
        // delete tuits we inserted
        tuits.map(tuit =>
            deleteTuitById(tuit.id)
        )
    );

    test('can retrieve all tuits with REST API', async () => {
        // retrieve all tuits
        const testTuits = await findAllTuits();

        // there should be a minimum number of tuits
        expect(testTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // check each tuit we inserted
        const tuitInserted = testTuits.filter(
            tuit => tuits.indexOf(tuit.id) >= 0
        );

        //compare the actual tuit in  databse with ones we sent
        tuitInserted.forEach((test, i) => {
            const curTuit = tuits.find(i => test.id === i);
            expect(curTuit.id).toEqual(i);
            expect(curTuit.tuit).toEqual(`test tuit ${i}`);
            expect(test.postedBy).toEqual(BobId);
        })
    })

});
