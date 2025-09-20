#!/bin/bash
# This script builds and starts the Docker containers.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Building and starting Docker containers ---"

# Build and run the containers in detached mode
# The -f flag is used to specify the path to the compose file
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d

echo "---------------------------------------------------"
echo "Deployment complete!"
echo ""
echo "You can access the applications at the following URLs:"
echo "- Frontend (HaoXing): http://localhost:8082"
echo "- BMS (HaoXing-BMS): http://localhost:8081"
echo ""
echo "To stop the services, run 'docker-compose down'."
echo "---------------------------------------------------"