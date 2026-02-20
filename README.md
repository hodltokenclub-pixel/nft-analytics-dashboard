# NFT Analytics Dashboard

A real-time NFT analytics dashboard for MultiversX collections, built with HTML, JavaScript, and Node.js.

## Features

- **Real-time NFT Data**: Fetches live data from MultiversX blockchain
- **Collection Analytics**: Floor prices, holder counts, listed percentages
- **Multi-Marketplace Support**: XOXNO and OOX marketplace integration
- **Responsive Design**: Works on desktop and mobile devices
- **Simple Deployment**: Single HTML file with optional Node.js server

## Live Demo

Visit: [https://hodltokenclub-pixel.github.io/nft-analytics-dashboard/](https://hodltokenclub-pixel.github.io/nft-analytics-dashboard/)

## Quick Start

### Option 1: Static HTML (No Server)
Simply open `index.html` in your browser. The dashboard will fetch data directly from public APIs.

### Option 2: With Node.js Server
```bash
# Clone the repository
git clone https://github.com/hodltokenclub-pixel/nft-analytics-dashboard.git
cd nft-analytics-dashboard

# Install dependencies (none required, but Node.js is needed for the server)
npm install

# Start the server
npm start

# Open your browser to http://localhost:3000
```

## API Endpoints

The dashboard fetches data from:
- **MultiversX API**: `https://api.multiversx.com/collections/{collection}/stats`
- **XOXNO API**: `https://api.xoxno.com/getCollectionFloorPrice/{collection}`
- **OOX API**: `https://api.oox.art/collection/{collection}`

## Supported Collections

Default collections:
- **Empyreans**: `EMP-897b49`
- **GH-NFT Voucher**: `GHNFTFMV-0f8770`
- **HF-NFT**: `FHODL-a9ad67`

## Project Structure

```
nft-analytics-dashboard/
├── index.html          # Main dashboard interface
├── server.js           # Optional Node.js server
├── package.json        # Node.js dependencies
└── README.md           # This file
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: MultiversX, XOXNO, OOX Marketplace
- **Server**: Node.js (optional)
- **Styling**: Custom CSS with modern design

## Development

To modify the dashboard:

1. Edit `index.html` for UI changes
2. Modify JavaScript functions in the `<script>` section for logic changes
3. Update `server.js` if you need custom API endpoints

## Deployment

### GitHub Pages
1. Push to the `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Set source to `gh-pages` branch

### Self-Hosted
1. Upload all files to your web server
2. Ensure CORS headers are properly configured if using APIs
3. For production, consider adding caching and rate limiting

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions, please open an issue on GitHub.