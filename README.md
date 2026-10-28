# Meta Lead Handler

A real-time lead notification dashboard that receives Meta Lead Ads webhook events and displays incoming leads in a React Native app using Socket.IO.

## Architecture

![Meta Lead Handler Architecture](docs/architecture.png)

**Data flow:**

1. A test lead is created through Meta's Lead Ads Testing Tool or submitted through a Facebook Instant Form.
2. Meta sends a webhook notification to the backend's public HTTPS endpoint.
3. Ngrok forwards the request to the locally running Express server.
4. The backend processes the `leadgen` event and stores lead metadata in memory.
5. Socket.IO broadcasts the new lead to connected clients.
6. The Expo dashboard updates automatically without requiring a manual refresh.

## Tech Stack

**Frontend**
- React Native
- Expo
- TypeScript
- NativeWind
- Socket.IO Client

**Backend**
- Node.js
- Express.js
- Socket.IO
- Meta Webhooks
- Ngrok
- In-memory storage

## Project Structure

```text
MetaLeadHandler/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── app/
│   │   └── index.tsx
│   └── package.json
├── docs/
│   └── architecture.png
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- Expo Go or an Android emulator
- A Meta Developer account and Facebook Page
- Ngrok account and authentication token

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd MetaLeadHandler
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5001
META_VERIFY_TOKEN=your_custom_verify_token
NGROK_AUTHTOKEN=your_ngrok_auth_token
```

Keep these values private. Never commit `.env` to Git.

### 3. Start the backend

```bash
npm run dev
```

The Express server runs on port `5001`. If ngrok is started programmatically by the backend, it should also expose the server through a public HTTPS URL.

### 4. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npx expo start
```

Open the app in Expo Go or an Android emulator.

For a physical Android device, configure the frontend to use your Mac's local IP address for the backend connection. The device and Mac should be on the same Wi-Fi network.

### 5. Configure Meta Webhooks

In the Meta Developer Dashboard:

1. Open your app and configure the **Page** webhook object.
2. Set the callback URL to your public ngrok URL followed by `/webhook`.
3. Enter the same verification token configured in `backend/.env`.
4. Subscribe to the `leadgen` field.
5. Subscribe your Facebook Page to the app for lead notifications.

### 6. Test the integration

1. Keep the backend, ngrok tunnel, and Expo app running.
2. Open the [Meta Lead Ads Testing Tool](https://developers.facebook.com/tools/lead-ads-testing).
3. Select your Page and test form, then create a test lead.
4. Check the backend terminal for the incoming notification.
5. Confirm that the lead appears in the Expo dashboard without refreshing.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Health check |
| GET | `/webhook` | Meta webhook verification |
| POST | `/webhook` | Receive lead notifications |
| GET | `/leads` | Retrieve stored lead metadata |

## Socket.IO Events

| Event | Direction | Purpose |
|---|---|---|
| `initial-leads` | Backend → Frontend | Sends existing leads when a client connects |
| `new-lead` | Backend → Frontend | Broadcasts a newly received lead |

## Current Limitations

- **In-memory storage:** Leads are lost when the backend restarts.
- **Lead metadata:** Webhook notifications contain identifiers and metadata; retrieving actual form answers requires a separate Meta Graph API request and appropriate permissions.
- **Duplicate handling:** Production use should deduplicate notifications using `leadgen_id`.
- **Local development:** Ngrok and a local server are suitable for testing, but reliable production use requires a deployed backend and persistent storage.

## Future Improvements

- Integrate PostgreSQL for persistent lead storage.
- Fetch complete lead details through the Meta Graph API.
- Implement duplicate detection and error handling.
- Deploy the backend to a hosted environment.
- Add authentication and access controls.

## License

Add a license if you intend to distribute or open-source this project.
