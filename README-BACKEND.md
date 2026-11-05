# Cinevo BMU – Assessment 2

This version keeps the original Cinevo cinema-booking interface and adds linked pages, JavaScript form handling, validation, form submissions and persistent JSON-file storage.

## Requirements
- Node.js LTS installed
- VS Code (recommended)
- A modern browser

## Run the project
1. Extract the ZIP.
2. Open the `Cinevo-Project` folder in VS Code.
3. Open the terminal in that folder.
4. Run `npm install`.
5. Run `npm start`.
6. Open `http://localhost:5000` in your browser.

Do not open the HTML files by double-clicking them. Use the local server URL so API requests work.

## Assessment 2 features

### Additional linked pages
- `about.html` – project information
- `contact.html` – contact form
- `feedback.html` – rating and feedback form
- Existing pages remain: sign-in/sign-up, home, movies, movie details, seat selection, checkout, ticket, tickets and profile.
- Links to About, Contact and Feedback are available in the footer of the existing app pages and in the new pages' header/footer.

### JavaScript interactions and validation
- Sign-up and sign-in use JavaScript `fetch()` requests to the backend.
- HTML required fields, email validation, length limits, numeric limits and server-side validation are used.
- Contact and feedback forms submit without reloading the page.
- Submit buttons show a loading state; success and error messages are shown accessibly.
- Checkout validates the booking and sends the booking details to the backend before showing the confirmation ticket.

### JSON file storage
Submitted records are stored in the `data` folder:
- `users.json` – registered users (passwords are stored as salted hashes, not plain text)
- `bookings.json` – confirmed demo bookings
- `contact-messages.json` – contact form submissions
- `feedback.json` – feedback and ratings
- `newsletter.json` – newsletter subscriptions (API endpoint included)
- `movies.json` – movie records created through the API

The server creates missing JSON files automatically. The JSON files update when a successful form is submitted.

## API endpoints
Base URL: `http://localhost:5000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check server |
| POST | `/api/users` | Register account |
| POST | `/api/auth/login` | Sign in |
| GET / POST | `/api/bookings` | List / save bookings |
| GET / POST | `/api/contact` | List / save contact messages |
| GET / POST | `/api/feedback` | List / save feedback |
| POST | `/api/newsletter` | Save newsletter email |
| GET / POST | `/api/movies` | List / add movie records |

## Quick test checklist
1. Start the server and visit `http://localhost:5000/api/health`.
2. Create an account using Sign Up. Check `data/users.json`.
3. Sign out and sign in with the account.
4. Open Contact, submit a valid message. Check `data/contact-messages.json`.
5. Open Feedback, submit a rating and comments. Check `data/feedback.json`.
6. Sign in, select a movie, seats and complete the demo checkout. Check `data/bookings.json`.
7. Try submitting empty or invalid fields; the browser/server should reject them.

## Important notes
- Checkout is a front-end demonstration. It does not charge a real card or connect to a payment gateway.
- The movie catalogue and demo cinema/showtime data in the existing interface are sample data. Movie records submitted to `/api/movies` are stored in `data/movies.json`.
- JSON-file storage is suitable for a local academic demonstration, not a production ticketing system with multiple concurrent users.
- Do not publish real personal data or payment card details in this college demo.
