# Clalit Home Task

React Native app for a simple medical appointment booking flow.

The app includes:
- Login screen
- Specialty selection
- Doctor schedule screen with available dates and times
- Appointment summary
- Existing appointment management with update and cancel actions

There is no real backend in this project. The app uses static data for the available schedules and local storage for the saved session and active appointment.

## Installation

```bash
npm install
```

## Running the App

```bash
npm run start
```

Then you can open the app with:
- `a` for Android emulator
- `i` for iOS simulator
- Expo Go by scanning the QR code

You can also run directly with:

```bash
npm run android
npm run ios
```

## Main Functionality

- Login with username and password
- Select a medical specialty
- View available dates and times
- Book a new appointment
- View appointment summary
- Restore saved login and active appointment on app restart
- Update an existing appointment
- Cancel an existing appointment
- Logout

## Technical Decisions

- `Expo`  
  Chosen to keep the setup simple and focused on the task itself.

- `TypeScript`  
  Used for clearer models and safer component/store logic.

- `React Navigation`  
  The task describes a linear screen flow, so stack navigation was the simplest fit.

- `Zustand`  
  Chosen as the state management solution because it keeps the code small and readable for a project of this size. It was used for authentication state and appointment state.

- `AsyncStorage` + `SecureStore`  
  `AsyncStorage` is used for the active appointment and saved user data.  
  `SecureStore` is used for the mock auth token.

- Static data instead of API calls  
  The task does not require a real server, so the doctor schedules are kept locally in a static data file.

## Notes

- The "token" in this project is a mock token used only to simulate a saved authenticated session.
- The doctor calendar is presented as available dates and time slots rather than a full calendar widget, to keep the implementation simple and focused on the assignment requirements.
