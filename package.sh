#!/bin/bash
# This script builds the Docker images and packages them into a distributable tarball.

set -e

echo "--- Step 1: Running the build script to create local images ---"
# The build.sh script needs to be run from within its directory
cd Deployment
./build.sh
cd ..

echo "
--- Step 2: Creating release package ---"
RELEASE_DIR="release"
rm -rf $RELEASE_DIR
mkdir -p $RELEASE_DIR

echo "---> Saving images to .tar files..."
docker save haoxing-server:latest > $RELEASE_DIR/haoxing-server.tar
docker save haoxing-frontend:latest > $RELEASE_DIR/haoxing-frontend.tar
docker save haoxing-bms:latest > $RELEASE_DIR/haoxing-bms.tar

echo "---> Copying docker-compose.yml..."
cp ./Deployment/docker-compose.yml $RELEASE_DIR/

echo "---> Creating install.sh for the target machine..."
cat > $RELEASE_DIR/install.sh << EOL
#!/bin/bash
set -e
echo "--- Loading Docker images ---"
docker load < haoxing-server.tar
docker load < haoxing-frontend.tar
docker load < haoxing-bms.tar

echo "
--- Starting services with docker-compose ---"
docker-compose -p HaoXing up -d

echo "
--- Deployment complete! ---"
echo "Frontend: http://localhost:8082"
echo "BMS: http://localhost:8081"
EOL

chmod +x $RELEASE_DIR/install.sh

echo "
--- Step 3: Creating final release tarball ---"
tar -czf haoxing_release.tar.gz $RELEASE_DIR

# Clean up the intermediate release directory
rm -rf $RELEASE_DIR

echo "
--- Done! ---"
echo "Release package created at: haoxing_release.tar.gz"
echo "You can now transfer this file to another machine, extract it, and run the install.sh script."
