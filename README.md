# HaoXing Platform

This repository contains the HaoXing application suite, including the customer-facing web frontend, the back-office management system, and the Node.js backend API. A MySQL database and Docker-based tooling are included so the entire stack can be deployed with a single script.

## Repository Layout
- `HaoXing/` – Vite-based frontend that serves the main HaoXing experience
- `HaoXing-BMS/` – Vue-powered back-office (BMS) dashboard
- `HaoXing-server/` – Node.js/Express API for the platform
- `Deployment/` – Docker Compose definition and helper script used to build and start the stack
- `package.sh` – Utility script that exports production-ready Docker images and an installation bundle
- `old/` – Snapshot of the previous contents of this repository for reference

## Prerequisites
- Docker (tested with Docker 24+)
- Docker Compose plugin

## Deploy with Docker
1. Make sure Docker is running.
2. Execute the deployment script:
   ```bash
   chmod +x Deployment/build.sh
   ./Deployment/build.sh
   ```
   The script builds all service images and starts them with Docker Compose. When it completes, the services are available at:
   - Frontend: http://localhost:8082
   - BMS Dashboard: http://localhost:8081
   - API: http://localhost:3000
   The MySQL database runs on port 3306 with credentials defined in `Deployment/docker-compose.yml`.

To stop the stack, run `docker-compose -f Deployment/docker-compose.yml down`.

## Packaging for Distribution
If you need to distribute pre-built images, run the packaging script from the repository root:
```bash
chmod +x package.sh
./package.sh
```
This builds the images, exports them as tar archives, and generates `haoxing_release.tar.gz` containing everything required to install the stack on another host.

## Additional Notes
- Update environment variables and credentials in `Deployment/docker-compose.yml` before deploying to production.
- The scripts assume local execution with sufficient Docker permissions. Run them with `sudo` if your environment requires elevated privileges.
