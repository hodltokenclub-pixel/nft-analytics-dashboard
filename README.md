# Enhanced NFT Tracker with OOX Marketplace Integration

## Overview
The NFT tracker has been enhanced with OOX Marketplace API integration, providing:
- Real-time floor prices from OOX marketplace
- Collection statistics from MultiversX API
- Enhanced Discord reports with marketplace links
- Automated data collection

## Files
- `enhanced_nft_tracker.py` - Main enhanced tracker
- `oox_integration.py` - OOX Marketplace API client
- `run_enhanced_tracker.sh` - Bash script to run tracker
- `nft_floor_tracker.py` - Compatibility wrapper
- `post_nft_report.py` - Discord posting utility

## Usage

### Run Enhanced Tracker
```bash
./run_enhanced_tracker.sh
# or
python3 enhanced_nft_tracker.py
```

### Run Compatibility Wrapper
```bash
python3 nft_floor_tracker.py  # Uses old name, runs enhanced tracker
```

### Post to Discord
```bash
python3 post_nft_report.py
```

## Scheduled Runs
Add to crontab for daily updates:
```bash
0 9 * * * cd /home/ubuntu/.openclaw/workspace && ./run_enhanced_tracker.sh
```

## Data Sources
1. **OOX Marketplace API** (https://api.oox.art/)
   - Floor prices
   - NFT listings
   - Collection stats
   - Marketplace URLs

2. **MultiversX API** (https://api.multiversx.com/)
   - Holder counts
   - Total NFTs
   - Verification status
   - EGLD price

## Collections Tracked
- Empyreans (EMP-897b49)
- GH-NFT Voucher (GHNFTFMV-0f8770)
- HF-NFT (FHODL-a9ad67)

## Backup
Original files backed up to: `backup_nft_tracker/`
