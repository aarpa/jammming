This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

Jammming is a front-end web app that uses React components, states and requests with the Spotify API to search Spotify libraries, create, edit and save custom playlists to the user's Spotify account.

## Features

Spotify Login — the first time a user searches for a song, album, or artist, Spotify will ask them to log in or set up a new account.

Search by Song, Album, or Artist — a user can type the name of a song, artist, or album into the search bar and click the `SEARCH` button. The app will request song data about the user’s input from the Spotify library.

Populate Results List — Jammming displays the list of returned tracks from the user’s query.

Add Song to a Custom Playlist — users can add a track to their playlist by selecting the `+` sign on the right side of the track’s display container.

Remove Song from Custom Playlist — users can remove a track from their playlist by selecting the `-` sign on the right side of the track’s display container.

Change Playlist Title — users can change the title of their custom playlist.

Save Playlist to Account — users can save their custom playlist by clicking a button called `SAVE TO SPOTIFY`.

## Feature Additions

In order to ensure that all essential use cases and edge cases are addressed, as well as to ensure that the technical implementation of the feature will work as intended and set up the app for future success, additional documentation was created for further development of this app. The following are links to the detailed technical design documents to lay out all of the necessary functionality of the features and how they should be implemented:

[Change Display of Tracks on Search Results & Playlist](https://docs.google.com/document/d/155efVJ_X0Hr22232a6RGMtDajhAOVk8DavILb2lcT10/edit?usp=sharing)

[Provide User Feedback When Loading Search Results and Saving Playlist](https://docs.google.com/document/d/1PH-WrK6Giu7XVk6Qk08JIQM8dwQTac8MUf4Xqm-8pCU/edit?usp=sharing)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
