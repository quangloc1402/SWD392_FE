npm run build
echo "Deploy files to server..."
scp -r dist/* root@103.200.20.87:/var/www/html/