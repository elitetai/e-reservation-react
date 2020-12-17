# e-Reservation

This react project is a simple e-reservation web app that could help the diner to book or reserve a table whilst the restaurant owner can allocate the tables based on the queue number:

1. Customer/diner shall input the headcount number and they will obtain the tables required and the amount of customers being allocated to a table automatically.
1. If there's no available table, it will automatically prompt the amount of customers that will have to wait for next available table and also they will get a queue number.
1. Restaurant owner can set the amount of tables with a fix amount of chairs per table.
1. The tables availability will be shown as a progress bar 
1. The owner can vacant the occupied tables once available.
1. The owner can also manually allocate the tables with given queue numbers.


**Additional info**

This project uses API endpoint from Flask/Python called [e-reservation-python](https://github.com/elitetai/e-reservation-python), which uses **MongoDB** as the database.

Deployed under Netlify. **[Click Here](https://e-reservation.netlify.app)** (It might take some time to load - please wait for it to start up from its dormant state)


---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

