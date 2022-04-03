import {
    findAllTuits,
    findTuitById,
    createTuit,
    deleteTuitById, findTuitByUser
} from "../services/tuits-service";

jest.useRealTimers();

describe('createTuit', () => {
    const userId = '6249c134a830f2760d057eb7';
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
        const newTuit = await createTuit(userId, sampleTuit);

        //verify inserted tuit's properties match parameter tuit
        expect(newTuit.id).toEqual(sampleTuit.id);
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(userId);
    });
});

describe('deleteTuit', () => {
    // create a sample user
    const userId = '6249c134a830f2760d057eb7';
    // sample tuit to insert
    const sampleTuit = {
        id: '1',
        tuit: 'This is a test tuit.'
    };

    // setup the tests before verification
    beforeAll(() => {
        // insert the sample tuit we then try to remove
        return createTuit(userId, sampleTuit);
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
    const userId = '6249c134a830f2760d057eb7';
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
        const newTuit = await createTuit(userId, sampleTuit);

        // verify new tuit matches the parameter tuit
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(userId);

        // retrieve the tuit from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter tuit
        expect(existingTuit.tuit).toEqual(sampleTuit.tuit);
        expect(existingTuit.postedBy._id).toEqual(userId);
    });
});

describe('findAllTuits', () => {
    //sample tuits we will insert into then retrieve
    const tuitsId = [
        '1', '2', '3'
    ];

    const userId = '6249c346a830f2760d057f08';
    //setup data before test
    beforeAll(async () => {
       await Promise.all(tuitsId.map(id =>
            createTuit(userId,{
                id: id,
                tuit: `test tuit ${id}`
            })
        ))
    });

    //clean up after test
    // async/await is to wait the only promise resolved and then go to the next function i.e. test
    afterAll(async () =>
       // promise.all return only one promise
       await Promise.all(
           // return [promise1, promise2, promise3]
           tuitsId.map(id => deleteTuitById(id))
       ) //

    );


    test('can retrieve all tuits with REST API', async () => {
        // retrieve all tuits
        const testTuits = await findTuitByUser(userId);
        console.log(testTuits)
        // there should be a minimum number of tuits
        expect(testTuits.length).toBeGreaterThanOrEqual(tuitsId.length);

        //compare the actual tuit in  databse with ones we sent
        testTuits.forEach(test => {
            const curId = tuitsId.find(id => id === test.id)
            expect(test.id).toEqual(curId);
            expect(test.tuit).toEqual(`test tuit ${curId}`);
            expect(test.postedBy).toEqual(userId);
        })
    })

});
